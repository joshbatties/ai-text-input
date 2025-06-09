"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, Trash2 } from "lucide-react"

interface SearchHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  history: string[]
  onSelectQuery: (query: string) => void
  onClearHistory: () => void
  onDeleteQuery: (index: number) => void
  isDark: boolean
}

export function SearchHistoryModal({
  isOpen,
  onClose,
  history,
  onSelectQuery,
  onClearHistory,
  onDeleteQuery,
  isDark,
}: SearchHistoryModalProps) {
  const themeClasses = {
    text: isDark ? "text-white" : "text-black",
    secondaryText: isDark ? "text-gray-400" : "text-gray-600",
    itemHover: isDark ? "hover:bg-gray-800" : "hover:bg-gray-100",
    border: isDark ? "border-gray-800" : "border-gray-200",
  }

  const handleSelectQuery = (query: string) => {
    onSelectQuery(query)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-2xl max-h-[80vh] ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
      >
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${themeClasses.text}`}>
            <Clock className="h-5 w-5" />
            Search History
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <p className={`text-sm ${themeClasses.secondaryText}`}>
              {history.length} {history.length === 1 ? "query" : "queries"} saved
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearHistory}
              disabled={history.length === 0}
              className={`text-sm ${themeClasses.secondaryText}`}
            >
              Clear All
            </Button>
          </div>

          {/* History List */}
          <div className="max-h-96 overflow-y-auto">
            {history.length === 0 ? (
              <div className={`text-center py-8 ${themeClasses.secondaryText}`}>
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No search history yet</p>
                <p className="text-sm mt-1">Your queries will appear here</p>
              </div>
            ) : (
              <div className="space-y-2">
                {history.map((query, index) => (
                  <div
                    key={index}
                    className={`group flex items-center justify-between p-3 rounded-lg border ${themeClasses.border} ${themeClasses.itemHover} transition-colors`}
                  >
                    <button
                      onClick={() => handleSelectQuery(query)}
                      className={`flex-1 text-left text-sm ${themeClasses.text} truncate pr-2`}
                    >
                      {query}
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteQuery(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete query</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
