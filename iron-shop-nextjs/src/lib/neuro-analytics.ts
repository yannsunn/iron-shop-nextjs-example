/**
 * Basic Neuro-Analytics Engine
 * 脳科学に基づいたユーザー行動分析（段階1実装）
 */

interface NeuroMetrics {
  attentionScore: number      // 注意力スコア (0-100)
  emotionalValence: number    // 感情価 (-1 to 1)
  cognitiveLoad: number       // 認知負荷 (0-100)
  engagementRate: number      // エンゲージメント率 (0-100)
}

interface UserBehavior {
  mouseMovements: Array<{x: number, y: number, timestamp: number}>
  scrollPatterns: Array<{position: number, velocity: number, timestamp: number}>
  clickHeatmap: Array<{x: number, y: number, element: string}>
  dwellTime: Record<string, number>
  exitIntent: boolean
}

export class NeuroAnalytics {
  private static instance: NeuroAnalytics
  private behavior: UserBehavior = {
    mouseMovements: [],
    scrollPatterns: [],
    clickHeatmap: [],
    dwellTime: {},
    exitIntent: false
  }

  private constructor() {
    this.initializeTracking()
  }

  static getInstance(): NeuroAnalytics {
    if (!NeuroAnalytics.instance) {
      NeuroAnalytics.instance = new NeuroAnalytics()
    }
    return NeuroAnalytics.instance
  }

  private initializeTracking(): void {
    if (typeof window === 'undefined') return

    // マウストラッキング
    window.addEventListener('mousemove', this.trackMouseMovement.bind(this))
    
    // スクロールパターン分析
    window.addEventListener('scroll', this.trackScrollPattern.bind(this))
    
    // クリックヒートマップ
    window.addEventListener('click', this.trackClick.bind(this))
    
    // 離脱意図検知
    window.addEventListener('mouseout', this.detectExitIntent.bind(this))
  }

  private trackMouseMovement(event: MouseEvent): void {
    const movement = {
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now()
    }
    
    this.behavior.mouseMovements.push(movement)
    
    // メモリ効率のため最新50件のみ保持
    if (this.behavior.mouseMovements.length > 50) {
      this.behavior.mouseMovements.shift()
    }
  }

  private trackScrollPattern(): void {
    const scrollData = {
      position: window.scrollY,
      velocity: this.calculateScrollVelocity(),
      timestamp: Date.now()
    }
    
    this.behavior.scrollPatterns.push(scrollData)
    
    if (this.behavior.scrollPatterns.length > 25) {
      this.behavior.scrollPatterns.shift()
    }
  }

  private trackClick(event: MouseEvent): void {
    const target = event.target as HTMLElement
    const clickData = {
      x: event.clientX,
      y: event.clientY,
      element: target.tagName + (target.id ? `#${target.id}` : '')
    }
    
    this.behavior.clickHeatmap.push(clickData)
  }

  private detectExitIntent(event: MouseEvent): void {
    if (event.clientY <= 0) {
      this.behavior.exitIntent = true
      this.triggerExitIntentOptimization()
    }
  }

  private calculateScrollVelocity(): number {
    if (this.behavior.scrollPatterns.length < 2) return 0
    
    const recent = this.behavior.scrollPatterns[this.behavior.scrollPatterns.length - 1]
    const previous = this.behavior.scrollPatterns[this.behavior.scrollPatterns.length - 2]
    
    const distance = Math.abs(recent.position - previous.position)
    const time = recent.timestamp - previous.timestamp
    
    return distance / Math.max(time, 1)
  }

  private triggerExitIntentOptimization(): void {
    // 離脱意図を検知した際の最適化
    const event = new CustomEvent('neuro:exitIntent', {
      detail: { behavior: this.behavior }
    })
    window.dispatchEvent(event)
  }

  public calculateNeuroMetrics(): NeuroMetrics {
    return {
      attentionScore: this.calculateAttentionScore(),
      emotionalValence: this.calculateEmotionalValence(),
      cognitiveLoad: this.calculateCognitiveLoad(),
      engagementRate: this.calculateEngagementRate()
    }
  }

  private calculateAttentionScore(): number {
    // マウスの動きの安定性から注意力を推定
    if (this.behavior.mouseMovements.length < 5) return 50
    
    const movements = this.behavior.mouseMovements.slice(-5)
    let totalVariance = 0
    
    for (let i = 1; i < movements.length; i++) {
      const dx = movements[i].x - movements[i-1].x
      const dy = movements[i].y - movements[i-1].y
      const distance = Math.sqrt(dx * dx + dy * dy)
      totalVariance += distance
    }
    
    const avgVariance = totalVariance / movements.length
    return Math.max(0, Math.min(100, 100 - avgVariance / 5))
  }

  private calculateEmotionalValence(): number {
    // クリック頻度とスクロール速度から感情価を推定
    const clickRate = this.behavior.clickHeatmap.length / Math.max(1, Date.now() / 1000)
    const avgScrollVelocity = this.behavior.scrollPatterns.reduce((acc, p) => acc + p.velocity, 0) / Math.max(1, this.behavior.scrollPatterns.length)
    
    // 高いクリック率と適度なスクロール速度は正の感情を示す
    const valence = (clickRate * 0.5) + (1 - Math.min(1, avgScrollVelocity / 10)) * 0.5
    return valence * 2 - 1 // -1 to 1 の範囲に正規化
  }

  private calculateCognitiveLoad(): number {
    // マウスの動きの複雑さとスクロールパターンから認知負荷を推定
    const mouseComplexity = this.calculateMouseComplexity()
    const scrollComplexity = this.calculateScrollComplexity()
    
    return (mouseComplexity + scrollComplexity) / 2
  }

  private calculateMouseComplexity(): number {
    if (this.behavior.mouseMovements.length < 3) return 50
    
    let directionChanges = 0
    for (let i = 2; i < this.behavior.mouseMovements.length; i++) {
      const prev = this.behavior.mouseMovements[i-1]
      const curr = this.behavior.mouseMovements[i]
      const prevPrev = this.behavior.mouseMovements[i-2]
      
      const angle1 = Math.atan2(prev.y - prevPrev.y, prev.x - prevPrev.x)
      const angle2 = Math.atan2(curr.y - prev.y, curr.x - prev.x)
      
      if (Math.abs(angle2 - angle1) > Math.PI / 4) {
        directionChanges++
      }
    }
    
    return Math.min(100, directionChanges * 10)
  }

  private calculateScrollComplexity(): number {
    if (this.behavior.scrollPatterns.length < 2) return 50
    
    let velocityChanges = 0
    for (let i = 1; i < this.behavior.scrollPatterns.length; i++) {
      const velocityDiff = Math.abs(
        this.behavior.scrollPatterns[i].velocity - 
        this.behavior.scrollPatterns[i-1].velocity
      )
      if (velocityDiff > 0.5) {
        velocityChanges++
      }
    }
    
    return Math.min(100, velocityChanges * 5)
  }

  private calculateEngagementRate(): number {
    const clicks = this.behavior.clickHeatmap.length
    const movements = this.behavior.mouseMovements.length
    const scrolls = this.behavior.scrollPatterns.length
    
    // エンゲージメントスコアの計算
    const interactionScore = Math.min(100, (clicks * 10) + (movements * 0.1) + (scrolls * 2))
    const exitPenalty = this.behavior.exitIntent ? 20 : 0
    
    return Math.max(0, interactionScore - exitPenalty)
  }

  public getBehaviorData(): UserBehavior {
    return { ...this.behavior }
  }
}

// Singleton instance export
export const neuroAnalytics = NeuroAnalytics.getInstance()