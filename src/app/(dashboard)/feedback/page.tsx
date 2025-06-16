import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Feedback</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Share Your Thoughts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="What's this feedback about?"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think..."
              className="min-h-[200px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full"
            />
          </div>

          <Button className="w-full">
            Submit Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 