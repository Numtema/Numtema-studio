import CompareClient from "./compare-client"

export const dynamic = "force-dynamic"

export default function ComparePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-violet-900 dark:text-violet-100">Comparaison d'agents</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Comparez les performances de vos agents IA</p>
      </div>
      <CompareClient />
    </div>
  )
}
