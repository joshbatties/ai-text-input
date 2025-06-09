"use client"

import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface RecentSearchesProps {
  history: string[]
  onSelectQuery: (query: string) => void
  onShowAll: () => void
  isDark: boolean
}

export function RecentSearches({ history, onSelectQuery, onShowAll, isDark }: RecentSearchesProps) {
  const themeClasses = {
    text: isDark ? "text-white" : "text-black",
    secondaryText: isDark ? "text-gray-400" : "text-gray-600",
    chip: isDark
      ? "bg-gray-900 border-gray-800 hover:bg-gray-800 text-gray-300"
      : "bg-white border-gray-200 hover:bg-gray-100 text-gray-700",
  }

  // Show only the 3 most recent searches
  const recentQueries = history.slice(0, 3)

  if (history.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-medium flex items-center gap-2 ${themeClasses.secondaryText}`}>
          <Clock className="h-4 w-4" />
          Recent Searches
        </h3>
        {history.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onShowAll}
            className={`text-sm ${themeClasses.secondaryText} hover:${themeClasses.text}`}
          >
            Show All ({history.length})
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {recentQueries.map((query, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelectQuery(query)}
            className={`text-sm max-w-xs truncate ${themeClasses.chip}`}
          >
            {query}
          </Button>
        ))}
        {history.length > 3 && (
          <Button variant="outline" size="sm" onClick={onShowAll} className={`text-sm ${themeClasses.chip}`}>
            +{history.length - 3} more
          </Button>
        )}
      </div>
    </div>
  )
}
