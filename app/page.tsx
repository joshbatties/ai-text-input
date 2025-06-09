"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Database, BarChart3, Users, FileText, Calendar, Send, Paperclip, Sun, Moon } from "lucide-react"
import { SearchHistoryModal } from "@/components/search-history-modal"
import { RecentSearches } from "@/components/recent-searches"

export default function DatabaseQueryInterface() {
  const [isDark, setIsDark] = useState(true)
  const [query, setQuery] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const themeClasses = {
    background: isDark ? "bg-black text-white" : "bg-white text-black",
    inputBg: isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
    buttonHover: isDark ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-700",
    secondaryText: isDark ? "text-gray-400" : "text-gray-600",
    chip: isDark
      ? "bg-gray-900 border-gray-800 hover:bg-gray-800 text-gray-300"
      : "bg-white border-gray-200 hover:bg-gray-100 text-gray-700",
  }

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory")
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Failed to parse search history from localStorage")
      }
    }
  }, [])

  // Save search history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
  }, [searchHistory])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSelectFromHistory = (query: string) => {
    setQuery(query)
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("searchHistory")
  }

  const deleteQuery = (index: number) => {
    setSearchHistory((prev) => prev.filter((_, i) => i !== index))
  }

  const suggestionChips = [
    { icon: Database, label: "Show Tables", query: "Show me all available tables" },
    { icon: BarChart3, label: "Sales Report", query: "Generate sales report for last quarter" },
    { icon: Users, label: "User Analytics", query: "Show user engagement metrics" },
    { icon: FileText, label: "Export Data", query: "Export customer data to CSV" },
    { icon: Calendar, label: "Recent Changes", query: "Show database changes from last week" },
  ]

  const handleSuggestionClick = (suggestionQuery: string) => {
    setQuery(suggestionQuery)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      console.log("Querying database:", query)
      if (file) {
        console.log("With file:", file.name)
      }

      // Add to search history if it's not a duplicate of the most recent query
      if (searchHistory.length === 0 || searchHistory[0] !== query) {
        setSearchHistory((prev) => [query, ...prev].slice(0, 50)) // Keep only the 50 most recent queries
      }

      // Handle query submission here
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className={themeClasses.buttonHover}>
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">What can I help you find?</h1>
            <p className={`text-lg ${themeClasses.secondaryText}`}>Ask questions about your company's database</p>
          </div>

          {/* Input Section */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className={`relative rounded-xl border transition-colors ${themeClasses.inputBg}`}>
              <div className="flex items-center p-4">
                {/* Input Field */}
                <div className="flex-1 relative">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about your database..."
                    className={`border-0 bg-transparent text-lg placeholder:text-gray-500 focus-visible:ring-0 ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  {/* File Upload Button */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleFileButtonClick}
                    className={themeClasses.buttonHover}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    disabled={!query.trim()}
                    className={`${query.trim() ? themeClasses.buttonHover : "text-gray-500 cursor-not-allowed"}`}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* File Preview */}
              {file && (
                <div
                  className={`flex items-center justify-between px-4 py-2 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className={themeClasses.buttonHover}
                  >
                    <span className="sr-only">Remove file</span>
                    <span aria-hidden="true">×</span>
                  </Button>
                </div>
              )}
            </div>
          </form>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {suggestionChips.map((chip, index) => {
              const IconComponent = chip.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleSuggestionClick(chip.query)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${themeClasses.chip}`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{chip.label}</span>
                </Button>
              )
            })}
          </div>

          {/* Recent Searches */}
          <RecentSearches
            history={searchHistory}
            onSelectQuery={handleSelectFromHistory}
            onShowAll={() => setIsHistoryModalOpen(true)}
            isDark={isDark}
          />
        </div>
      </div>

      {/* Search History Modal */}
      <SearchHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={searchHistory}
        onSelectQuery={handleSelectFromHistory}
        onClearHistory={clearSearchHistory}
        onDeleteQuery={deleteQuery}
        isDark={isDark}
      />
    </div>
  )
}
