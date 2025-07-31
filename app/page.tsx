'use client'

import { useState, useEffect, useRef } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [showVideo, setShowVideo] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(10)
  const [loopCount, setLoopCount] = useState(0)
  const [isLooping, setIsLooping] = useState(false)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  
  const playerRef = useRef<any>(null)
  const timeUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    loadYouTubeAPI()
  }, [])

  const loadYouTubeAPI = () => {
    if (window.YT) {
      createPlayer()
      return
    }

    window.onYouTubeIframeAPIReady = () => {
      createPlayer()
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
  }

  const createPlayer = () => {
    playerRef.current = new window.YT.Player('player', {
      height: '400',
      width: '100%',
      videoId: '',
      playerVars: {
        'playsinline': 1,
        'controls': 1,
        'rel': 0,
        'modestbranding': 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
  }

  const onPlayerReady = () => {
    console.log('YouTube player is ready')
    updateDuration()
    startTimeUpdate()
  }

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      if (isLooping) {
        restartLoop()
      }
    }
  }

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const loadVideo = () => {
    if (!videoUrl.trim()) {
      showNotification('Please enter a YouTube URL', 'error')
      return
    }

    const id = extractVideoId(videoUrl)
    if (!id) {
      showNotification('Invalid YouTube URL', 'error')
      return
    }

    setVideoId(id)
    setShowVideo(true)
    
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(id)
    }
    
    showNotification('Video loaded successfully!', 'success')
  }

  const setLoopPoints = () => {
    if (startTime >= endTime) {
      showNotification('Start time must be less than end time', 'error')
      return
    }

    showNotification('Loop points set successfully!', 'success')
  }

  const startLooping = () => {
    if (!videoId) {
      showNotification('Please load a video first', 'error')
      return
    }

    setIsLooping(true)
    showNotification('Looping started!', 'success')
  }

  const stopLooping = () => {
    setIsLooping(false)
    showNotification('Looping stopped!', 'success')
  }

  const restartLoop = () => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(startTime)
      playerRef.current.playVideo()
      setLoopCount(prev => prev + 1)
    }
  }

  const resetCounter = () => {
    setLoopCount(0)
    showNotification('Counter reset!', 'success')
  }

  const startTimeUpdate = () => {
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current)
    }

    timeUpdateIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const current = playerRef.current.getCurrentTime()
        setCurrentTime(formatTime(current))
        
        if (isLooping && current >= endTime) {
          restartLoop()
        }
      }
    }, 1000)
  }

  const updateDuration = () => {
    if (playerRef.current && playerRef.current.getDuration) {
      const duration = playerRef.current.getDuration()
      setDuration(formatTime(duration))
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    // Simple notification - you could enhance this with a toast library
    console.log(`${type.toUpperCase()}: ${message}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      loadVideo()
    }
  }

  return (
    <div className="container">
      <header>
        <h1>🎬 YouTube Video Looper</h1>
        <p>Loop any section of a YouTube video with ease</p>
      </header>

      <div className="main-content">
        {/* URL Input Section */}
        <div className="input-section">
          <div className="url-input-group">
            <label htmlFor="videoUrl">YouTube Video URL:</label>
            <div className="url-input-container">
              <input
                type="url"
                id="videoUrl"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={loadVideo} className="btn btn-primary">
                Load Video
              </button>
            </div>
          </div>
        </div>

        {/* Video Player Section */}
        {showVideo && (
          <div className="video-section">
            <div className="video-container">
              <div id="player"></div>
            </div>

            {/* Loop Controls */}
            <div className="loop-controls">
              <div className="loop-settings">
                <h3>Loop Settings</h3>
                <div className="time-inputs">
                  <div className="time-input-group">
                    <label htmlFor="startTime">Start Time (seconds):</label>
                    <input
                      type="number"
                      id="startTime"
                      min="0"
                      step="0.1"
                      value={startTime}
                      onChange={(e) => setStartTime(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="time-input-group">
                    <label htmlFor="endTime">End Time (seconds):</label>
                    <input
                      type="number"
                      id="endTime"
                      min="0"
                      step="0.1"
                      value={endTime}
                      onChange={(e) => setEndTime(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="loop-actions">
                  <button onClick={setLoopPoints} className="btn btn-secondary">
                    Set Loop Points
                  </button>
                  <button onClick={startLooping} className="btn btn-success">
                    Start Looping
                  </button>
                  <button onClick={stopLooping} className="btn btn-danger">
                    Stop Looping
                  </button>
                </div>
              </div>

              {/* Loop Counter */}
              <div className="loop-counter">
                <h3>Loop Counter</h3>
                <div className="counter-display">
                  <span id="loopCount" className={loopCount > 0 ? 'counter-update' : ''}>
                    {loopCount}
                  </span>
                  <span className="counter-label">repetitions</span>
                </div>
                <button onClick={resetCounter} className="btn btn-outline">
                  Reset Counter
                </button>
              </div>
            </div>

            {/* Video Info */}
            <div className="video-info">
              <div className="current-time">
                <span>Current Time: </span>
                <span>{currentTime}</span>
              </div>
              <div className="duration">
                <span>Duration: </span>
                <span>{duration}</span>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="instructions">
          <h3>How to use:</h3>
          <ol>
            <li>Paste a YouTube video URL and click "Load Video"</li>
            <li>Set your desired start and end times for the loop</li>
            <li>Click "Set Loop Points" to confirm your selection</li>
            <li>Click "Start Looping" to begin the repetition</li>
            <li>Watch the counter track how many times the section has repeated</li>
          </ol>
        </div>
      </div>
    </div>
  )
} 