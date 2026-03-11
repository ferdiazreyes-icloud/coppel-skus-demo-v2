interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  completedTabs?: Set<string>
  className?: string
}

export default function Tabs({
  tabs,
  activeTab,
  onTabChange,
  completedTabs = new Set(),
  className = '',
}: TabsProps) {
  return (
    <div className={`border-b border-border overflow-x-auto ${className}`}>
      <nav className="flex min-w-max">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          const isCompleted = completedTabs.has(tab.id)

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap
                transition-colors border-b-2
                ${isActive
                  ? 'text-coppel-blue border-coppel-blue'
                  : 'text-text-muted border-transparent hover:text-text-primary hover:border-border-dark'
                }
              `}
            >
              {/* Status dot */}
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isCompleted
                    ? 'bg-success'
                    : isActive
                    ? 'bg-coppel-blue'
                    : 'bg-border-dark'
                }`}
              />
              {tab.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
