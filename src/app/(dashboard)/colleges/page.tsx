import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const colleges = [
  {
    id: 1,
    name: 'Texas A&M University',
    status: 'In Progress',
    initial: 'T'
  },
  {
    id: 2,
    name: 'Stanford University',
    status: 'In Progress',
    initial: 'S'
  }
]

export default function CollegesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome, Ved!</h1>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Writing essays is about to get a lot easier. Let's get started:
        </h2>
        <ol className="space-y-2 text-sm">
          <li>1. Check out the <span className="text-blue-400">Background</span> tab. Spend 5 minutes reflecting there.</li>
          <li>2. Add your first college below. Click on its name to view the essay questions.</li>
          <li>3. Use Sups to generate ideas, and then write your first rough draft.</li>
        </ol>
      </div>

      <div className="space-y-4">
        {colleges.map((college) => (
          <Card key={college.id} className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600">
                  {college.initial}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{college.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {college.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}

        <Card className="p-4 border-2 border-dashed border-gray-300">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Add University"
                className="pl-10 border-blue-500 focus:border-blue-600"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 