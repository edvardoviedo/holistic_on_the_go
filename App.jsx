import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Sparkles, Moon, Sun, Music, Utensils, Shirt, Wand2 } from 'lucide-react'
import './App.css'

function App() {
  const [language, setLanguage] = useState('en')
  const [formData, setFormData] = useState({
    nickname: '',
    birthdate: '',
    birthplace: '',
    favoriteColor: '#8B5CF6',
    dailyGoal: '',
    checkpoints: []
  })
  const [guidance, setGuidance] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  const translations = {
    en: {
      title: "My On-the-Go Holistic Coach",
      subtitle: "Your mystical guide to daily harmony",
      nickname: "Nickname",
      birthdate: "Birthdate",
      birthplace: "Birthplace",
      favoriteColor: "Favorite Color",
      dailyGoal: "Daily Goal",
      selectGoal: "Select your goal",
      reduceStress: "Reduce stress",
      meditate: "Meditate",
      getCalm: "Get into calm",
      creativeMode: "Enter creative mode",
      induceSleep: "Induce sleep",
      checkpoints: "Optional Checkpoints",
      playlist: "🎶 Playlist or song",
      food: "🍲 Food recommendation",
      outfit: "👘 What to wear",
      magicalTip: "🌟 Extra magical tip",
      generateGuidance: "Generate My Guidance",
      loading: "Channeling cosmic wisdom...",
      zodiacSign: "Zodiac Sign",
      song: "Mystical Song",
      tip: "Magical Tip"
    },
    es: {
      title: "Mi Coach Holístico Portátil",
      subtitle: "Tu guía mística hacia la armonía diaria",
      nickname: "Apodo",
      birthdate: "Fecha de nacimiento",
      birthplace: "Lugar de nacimiento",
      favoriteColor: "Color favorito",
      dailyGoal: "Objetivo diario",
      selectGoal: "Selecciona tu objetivo",
      reduceStress: "Reducir estrés",
      meditate: "Meditar",
      getCalm: "Entrar en calma",
      creativeMode: "Entrar en modo creativo",
      induceSleep: "Inducir sueño",
      checkpoints: "Puntos de control opcionales",
      playlist: "🎶 Lista de reproducción o canción",
      food: "🍲 Recomendación de comida",
      outfit: "👘 Qué ponerse",
      magicalTip: "🌟 Tip mágico extra",
      generateGuidance: "Generar Mi Guía",
      loading: "Canalizando sabiduría cósmica...",
      zodiacSign: "Signo Zodiacal",
      song: "Canción Mística",
      tip: "Tip Mágico"
    }
  }

  const t = translations[language]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCheckpointChange = (checkpoint, checked) => {
    setFormData(prev => ({
      ...prev,
      checkpoints: checked 
        ? [...prev.checkpoints, checkpoint]
        : prev.checkpoints.filter(c => c !== checkpoint)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('http://localhost:5000/api/generate-guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setGuidance(data)
        setShowResponse(true)
      } else {
        console.error('Error generating guidance')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen cosmic-cursor">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <div className="glass-card rounded-full p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="text-cosmic-silver hover:text-cosmic-glow"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 floating">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-cosmic-glow mr-2" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cosmic-silver to-cosmic-glow bg-clip-text text-transparent">
              {t.title}
            </h1>
            <Sparkles className="w-8 h-8 text-cosmic-glow ml-2" />
          </div>
          <p className="text-cosmic-stardust text-lg md:text-xl">
            {t.subtitle}
          </p>
        </div>

        {!showResponse ? (
          /* Form Section */
          <Card className="glass-card max-w-2xl mx-auto floating">
            <CardHeader>
              <CardTitle className="text-center text-cosmic-silver flex items-center justify-center">
                <Moon className="w-6 h-6 mr-2" />
                Enter Your Cosmic Details
                <Moon className="w-6 h-6 ml-2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nickname */}
                <div className="floating-label">
                  <Input
                    id="nickname"
                    placeholder=" "
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    className="glass-card border-cosmic-glow/30 text-cosmic-silver"
                    required
                  />
                  <Label htmlFor="nickname">{t.nickname}</Label>
                </div>

                {/* Birthdate */}
                <div className="floating-label">
                  <Input
                    id="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => handleInputChange('birthdate', e.target.value)}
                    className="glass-card border-cosmic-glow/30 text-cosmic-silver"
                    required
                  />
                  <Label htmlFor="birthdate">{t.birthdate}</Label>
                </div>

                {/* Birthplace */}
                <div className="floating-label">
                  <Input
                    id="birthplace"
                    placeholder=" "
                    value={formData.birthplace}
                    onChange={(e) => handleInputChange('birthplace', e.target.value)}
                    className="glass-card border-cosmic-glow/30 text-cosmic-silver"
                    required
                  />
                  <Label htmlFor="birthplace">{t.birthplace}</Label>
                </div>

                {/* Favorite Color */}
                <div className="space-y-2">
                  <Label className="text-cosmic-silver">{t.favoriteColor}</Label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={formData.favoriteColor}
                      onChange={(e) => handleInputChange('favoriteColor', e.target.value)}
                      className="w-16 h-16 rounded-full border-2 border-cosmic-glow color-picker-glow cursor-pointer"
                    />
                    <span className="text-cosmic-stardust">{formData.favoriteColor}</span>
                  </div>
                </div>

                {/* Daily Goal */}
                <div className="space-y-2">
                  <Label className="text-cosmic-silver">{t.dailyGoal}</Label>
                  <Select onValueChange={(value) => handleInputChange('dailyGoal', value)}>
                    <SelectTrigger className="glass-card border-cosmic-glow/30 text-cosmic-silver">
                      <SelectValue placeholder={t.selectGoal} />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-cosmic-glow/30">
                      <SelectItem value="reduce-stress">{t.reduceStress}</SelectItem>
                      <SelectItem value="meditate">{t.meditate}</SelectItem>
                      <SelectItem value="get-calm">{t.getCalm}</SelectItem>
                      <SelectItem value="creative-mode">{t.creativeMode}</SelectItem>
                      <SelectItem value="induce-sleep">{t.induceSleep}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Checkpoints */}
                <div className="space-y-4">
                  <Label className="text-cosmic-silver">{t.checkpoints}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'playlist', label: t.playlist, icon: Music },
                      { id: 'food', label: t.food, icon: Utensils },
                      { id: 'outfit', label: t.outfit, icon: Shirt },
                      { id: 'tip', label: t.magicalTip, icon: Wand2 }
                    ].map(({ id, label, icon: Icon }) => (
                      <div key={id} className="flex items-center space-x-2">
                        <Checkbox
                          id={id}
                          checked={formData.checkpoints.includes(id)}
                          onCheckedChange={(checked) => handleCheckpointChange(id, checked)}
                          className="border-cosmic-glow"
                        />
                        <Label htmlFor={id} className="text-cosmic-stardust flex items-center">
                          <Icon className="w-4 h-4 mr-2" />
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cosmic-button text-white font-semibold py-3 rounded-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t.loading}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      {t.generateGuidance}
                      <Sparkles className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Response Section */
          <Card className="glass-card max-w-4xl mx-auto rotating-card">
            <CardHeader>
              <CardTitle className="text-center text-cosmic-silver flex items-center justify-center">
                <Sun className="w-6 h-6 mr-2" />
                Your Cosmic Guidance
                <Sun className="w-6 h-6 ml-2" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {guidance && (
                <>
                  {/* Main Message */}
                  <div className="glass-card p-6 rounded-lg particle-trail">
                    <p className="text-cosmic-silver text-lg leading-relaxed">
                      {guidance.message}
                    </p>
                  </div>

                  {/* Additional Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Zodiac Sign */}
                    <div className="glass-card p-4 rounded-lg glow">
                      <h3 className="text-cosmic-glow font-semibold mb-2 flex items-center">
                        <Moon className="w-5 h-5 mr-2" />
                        {t.zodiacSign}
                      </h3>
                      <p className="text-cosmic-stardust">{guidance.zodiacSign}</p>
                    </div>

                    {/* Song */}
                    {guidance.song && (
                      <div className="glass-card p-4 rounded-lg glow">
                        <h3 className="text-cosmic-glow font-semibold mb-2 flex items-center">
                          <Music className="w-5 h-5 mr-2" />
                          {t.song}
                        </h3>
                        <p className="text-cosmic-stardust">
                          <strong>{guidance.song.title}</strong> by {guidance.song.artist}
                        </p>
                        <p className="text-sm text-cosmic-stardust/70 mt-1">
                          {guidance.song.reason}
                        </p>
                      </div>
                    )}

                    {/* Magical Tip */}
                    {guidance.magicalTip && (
                      <div className="glass-card p-4 rounded-lg glow md:col-span-2">
                        <h3 className="text-cosmic-glow font-semibold mb-2 flex items-center">
                          <Wand2 className="w-5 h-5 mr-2" />
                          {t.tip}
                        </h3>
                        <p className="text-cosmic-stardust">{guidance.magicalTip}</p>
                      </div>
                    )}
                  </div>

                  {/* Back Button */}
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        setShowResponse(false)
                        setGuidance(null)
                      }}
                      className="cosmic-button text-white font-semibold px-8 py-2 rounded-lg"
                    >
                      Get New Guidance
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default App

