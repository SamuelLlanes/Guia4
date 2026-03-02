import { categories } from "../data/categories"
import { useContext } from "react"
import { BudgetDispatchContext, BudgetStateContext } from "../context/BudgetContext"

export const FilterByCategory = () => {
    const dispatch = useContext(BudgetDispatchContext)
    const state = useContext(BudgetStateContext)

    const handleChange = (e) => {
        dispatch({ type: 'add-filter-category', payload: { categoryId: e.target.value } })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar gastos</label>
                    <select id="category" className="bg-slate-100 p-3 flex-1 rounded" value={state ? state.currentCategory : ""} onChange={handleChange}>
                        <option value="">--- Todas las categorías ---</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
