"use client"

import { Button } from "@/components/ui/button"
import { Clock, X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchHistoryProps {
  history: string[]
  onSelectQuery: (query: string) => void
  onClearHistory: () => void
  isOpen: boolean
  onToggle: () => void
  isDark: boolean
}

export function SearchHistorySidebar({
  history,
  onSelectQuery,
  onClearHistory,
  isOpen,
  onToggle,
  isDark,
}: SearchHistoryProps) {
  const themeClasses = {
    background: isDark ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200",
    itemHover: isDark ? "hover:bg-gray-800" : "hover:bg-gray-200",
    text: isDark ? "text-white" : "text-black",
    secondaryText: isDark ? "text-gray-400" : "text-gray-600",
  }

  return (
    <>
      {/* Sidebar Toggle Button (Mobile & Tablet) */}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className={`fixed top-4 left-4 md:hidden z-40 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        <span className="sr-only">{isOpen ? "Close history" : "Open history"}</span>
      </Button>

      {/* Sidebar Backdrop (Mobile only) */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={onToggle} aria-hidden="true" />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-64 border-r transition-transform duration-300 ease-in-out",
          themeClasses.background,
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className={`font-semibold flex items-center gap-2 ${themeClasses.text}`}>
              <Clock className="h-4 w-4" />
              Search History
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearHistory}
                className={`text-xs ${themeClasses.secondaryText}`}
                disabled={history.length === 0}
              >
                Clear All
              </Button>
              <Button variant="ghost" size="icon" onClick={onToggle} className="md:hidden">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto">
            {history.length === 0 ? (
              <div className={`p-4 text-center ${themeClasses.secondaryText}`}>
                <p>No search history yet</p>
              </div>
            ) : (
              <ul className="py-2">
                {history.map((query, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-4 py-2 text-sm truncate rounded-none ${themeClasses.text} ${themeClasses.itemHover}`}
                      onClick={() => onSelectQuery(query)}
                    >
                      {query}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Toggle Button (Desktop) */}
          <div className="hidden md:block border-t border-gray-800 p-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggle}
              className="w-full flex items-center justify-center gap-2"
            >
              {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              {isOpen ? "Hide History" : "Show History"}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
