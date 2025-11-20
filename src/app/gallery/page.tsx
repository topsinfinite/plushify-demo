"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getMockUserGenerations, MockGeneration, mockGenerations } from "@/lib/mock-data"
import {
  Search,
  Filter,
  Heart,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Grid,
  Calendar,
  Star,
  ImageIcon,
  User,
  PawPrint,
  X
} from "lucide-react"

type FilterType = "all" | "people" | "pets" | "favorites"
type SortType = "newest" | "oldest" | "favorites"

interface GalleryModalData {
  generation: MockGeneration
  index: number
  filteredGenerations: MockGeneration[]
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [sortBy, setSortBy] = useState<SortType>("newest")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [modalData, setModalData] = useState<GalleryModalData | null>(null)
  const [itemsToShow, setItemsToShow] = useState(12)

  // Get and filter generations
  const filteredGenerations = useMemo(() => {
    let generations = getMockUserGenerations(filter === "all" ? undefined : filter)

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      generations = generations.filter(gen =>
        gen.style.toLowerCase().includes(query) ||
        gen.category.toLowerCase().includes(query) ||
        gen.createdAt.toLocaleDateString().includes(query)
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "oldest":
        return generations.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      case "favorites":
        return generations.sort((a, b) => {
          if (a.isFavorite && !b.isFavorite) return -1
          if (!a.isFavorite && b.isFavorite) return 1
          return b.createdAt.getTime() - a.createdAt.getTime()
        })
      case "newest":
      default:
        return generations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }
  }, [filter, sortBy, searchQuery])

  const displayedGenerations = filteredGenerations.slice(0, itemsToShow)

  const toggleFavorite = useCallback((generationId: string) => {
    const generation = mockGenerations.find(g => g.id === generationId)
    if (generation) {
      generation.isFavorite = !generation.isFavorite
      // Force re-render by updating state
      setFilter(prev => prev)
    }
  }, [])

  const toggleSelectItem = useCallback((generationId: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(generationId)) {
        newSet.delete(generationId)
      } else {
        newSet.add(generationId)
      }
      return newSet
    })
  }, [])

  const selectAll = useCallback(() => {
    setSelectedItems(new Set(displayedGenerations.map(g => g.id)))
  }, [displayedGenerations])

  const clearSelection = useCallback(() => {
    setSelectedItems(new Set())
    setIsSelectionMode(false)
  }, [])

  const deleteSelected = useCallback(() => {
    if (selectedItems.size === 0) return

    // Remove selected items from mock data
    for (const id of selectedItems) {
      const index = mockGenerations.findIndex(g => g.id === id)
      if (index > -1) {
        mockGenerations.splice(index, 1)
      }
    }

    clearSelection()
    setFilter(prev => prev) // Force re-render
  }, [selectedItems, clearSelection])

  const openModal = useCallback((generation: MockGeneration, index: number) => {
    if (isSelectionMode) {
      toggleSelectItem(generation.id)
      return
    }

    setModalData({
      generation,
      index,
      filteredGenerations: displayedGenerations
    })
  }, [isSelectionMode, displayedGenerations, toggleSelectItem])

  const navigateModal = useCallback((direction: "prev" | "next") => {
    if (!modalData) return

    const currentIndex = modalData.index
    let newIndex: number

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : modalData.filteredGenerations.length - 1
    } else {
      newIndex = currentIndex < modalData.filteredGenerations.length - 1 ? currentIndex + 1 : 0
    }

    setModalData({
      generation: modalData.filteredGenerations[newIndex],
      index: newIndex,
      filteredGenerations: modalData.filteredGenerations
    })
  }, [modalData])

  const downloadGeneration = useCallback((generation: MockGeneration) => {
    // In a real app, this would download the actual file
    const link = document.createElement("a")
    link.href = generation.plushieImage
    link.download = `plushie-${generation.id}.png`
    link.click()
  }, [])

  const loadMore = useCallback(() => {
    setItemsToShow(prev => prev + 12)
  }, [])

  const filterOptions = [
    { value: "all", label: "All Generations", icon: Grid },
    { value: "people", label: "People", icon: User },
    { value: "pets", label: "Pets", icon: PawPrint },
    { value: "favorites", label: "Favorites", icon: Star },
  ]

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "favorites", label: "Favorites First" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Plushie Gallery</h1>
          <p className="text-muted-foreground">
            Browse and manage all your AI-generated plushies
          </p>
        </div>

        {/* Controls */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by style, category, or date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter */}
            <Select value={filter} onValueChange={(value: FilterType) => setFilter(value)}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(value: SortType) => setSortBy(value)}>
              <SelectTrigger className="w-full sm:w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={isSelectionMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsSelectionMode(!isSelectionMode)}
              >
                {isSelectionMode ? "Cancel Selection" : "Select Items"}
              </Button>

              {isSelectionMode && (
                <>
                  <Button variant="outline" size="sm" onClick={selectAll}>
                    Select All
                  </Button>
                  {selectedItems.size > 0 && (
                    <Button variant="destructive" size="sm" onClick={deleteSelected}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected ({selectedItems.size})
                    </Button>
                  )}
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              {filteredGenerations.length} generation{filteredGenerations.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredGenerations.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No generations found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search or filters" : "Start creating your first plushie!"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedGenerations.map((generation, index) => (
                <Card
                  key={generation.id}
                  className={`group cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedItems.has(generation.id) ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => openModal(generation, index)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      {/* Selection Checkbox */}
                      {isSelectionMode && (
                        <div className="absolute top-2 left-2 z-10">
                          <Checkbox
                            checked={selectedItems.has(generation.id)}
                            onChange={() => toggleSelectItem(generation.id)}
                            className="bg-white/90 border-white"
                          />
                        </div>
                      )}

                      {/* Favorite Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`absolute top-2 right-2 z-10 h-8 w-8 p-0 bg-white/90 hover:bg-white ${
                          generation.isFavorite ? "text-red-500" : "text-muted-foreground"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(generation.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${generation.isFavorite ? "fill-current" : ""}`}
                        />
                      </Button>

                      {/* Main Image */}
                      <img
                        src={generation.plushieImage}
                        alt="Generated plushie"
                        className="w-full h-full object-cover rounded-t-lg"
                        loading="lazy"
                      />

                      {/* Hover Overlay with Original */}
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-t-lg">
                        <div className="text-center text-white">
                          <p className="text-sm font-medium mb-2">Original Photo</p>
                          <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden">
                            <img
                              src={generation.originalImage}
                              alt="Original"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {generation.style}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {generation.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {generation.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            {itemsToShow < filteredGenerations.length && (
              <div className="text-center mt-8">
                <Button onClick={loadMore} variant="outline">
                  Load More ({filteredGenerations.length - itemsToShow} remaining)
                </Button>
              </div>
            )}
          </>
        )}

        {/* Gallery Modal */}
        <Dialog open={!!modalData} onOpenChange={() => setModalData(null)}>
          <DialogContent className="max-w-4xl w-full">
            {modalData && (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle className="flex items-center gap-3">
                      <Badge variant="secondary">{modalData.generation.style}</Badge>
                      <Badge variant="outline">{modalData.generation.category}</Badge>
                    </DialogTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(modalData.generation.id)
                        }}
                        className={modalData.generation.isFavorite ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 ${modalData.generation.isFavorite ? "fill-current" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadGeneration(modalData.generation)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold mb-4">Original Photo</h4>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={modalData.generation.originalImage}
                        alt="Original"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold mb-4">Your Plushie</h4>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={modalData.generation.plushieImage}
                        alt="Generated plushie"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => navigateModal("prev")}
                    disabled={modalData.filteredGenerations.length <= 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {modalData.index + 1} of {modalData.filteredGenerations.length}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created on {modalData.generation.createdAt.toLocaleDateString()}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => navigateModal("next")}
                    disabled={modalData.filteredGenerations.length <= 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}