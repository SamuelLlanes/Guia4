import { categories } from "../data/categories"
import { useContext } from "react"
import { BudgetDispatchContext } from "../context/BudgetContext"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

export const ExpenseDetails = ({ expense }) => {
    const dispatch = useContext(BudgetDispatchContext) // recuperando el dispatch del reducer ddesde el context
    
    // Define una accion que se mostrara cuando el usuario deslice hacie la izquierda.
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );
    
    // Define una accion que se mostrara cuando el usuario deslice hacie la derecha.
    const trailingActions = () => (
        <TrailingActions> {/* Contenedor de acciones a la derecha */}
            <SwipeAction destructive={true} 
            onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );
    const categoryInfo = categories.find(cat => cat.id === expense.category) || {} // recuperando el nombre de la categoria
    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img src={categoryInfo.icon ? `/icono_${categoryInfo.icon}.svg` : `/icono_default.svg`} alt="Icono gasto"
                            className="w-20" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">
                            {expense.date ? new Date(expense.date).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "Fecha no disponible"}
                        </p>
                    </div>
                    <div className="text-2xl text-blue-600 font-bold">
                        <span className="font-black text-black"> ${Number.isFinite(expense.amount) ? expense.amount : ''}</span>
                    </div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
