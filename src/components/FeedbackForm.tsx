"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MessageSquare, Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface FeedbackFormProps {
  matchId: string
  predictionId?: string
  homeTeam?: string
  awayTeam?: string
  onSubmit?: () => void
  onSubmitted?: () => void
}

const FeedbackForm = ({ matchId, predictionId, homeTeam, awayTeam, onSubmit, onSubmitted }: FeedbackFormProps) => {
  const [rating, setRating] = useState<string>("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) {
      toast({
        title: "Hiányzó értékelés",
        description: "Kérjük, válassz egy értékelést",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase.functions.invoke("submit-feedback", {
        body: {
          match_id: matchId,
          prediction_id: predictionId,
          rating: Number.parseInt(rating),
          comment: comment.trim() || null,
        },
      })

      if (error) throw error

      toast({
        title: "Visszajelzés elküldve",
        description: "Köszönjük a visszajelzésedet!",
      })

      setRating("")
      setComment("")
      onSubmit?.()
      onSubmitted?.() // Call both callbacks for compatibility
    } catch (error) {
      toast({
        title: "Hiba történt",
        description: "Nem sikerült elküldeni a visszajelzést",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Visszajelzés
          {homeTeam && awayTeam && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({homeTeam} vs {awayTeam})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-3">
            <Label>Mennyire volt hasznos a predikció?</Label>
            <RadioGroup value={rating} onValueChange={setRating}>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="r1" />
                  <Label htmlFor="r1">Rossz</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="r2" />
                  <Label htmlFor="r2">Közepes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="r3" />
                  <Label htmlFor="r3">Jó</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="r4" />
                  <Label htmlFor="r4">Kiváló</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Megjegyzés (opcionális)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Írd le a tapasztalataidat..."
              rows={3}
            />
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Küldés...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Visszajelzés küldése
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default FeedbackForm
