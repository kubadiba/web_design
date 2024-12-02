const initialState = {
    items: [], // Список товарів у кошику
    totalAmount: 0, // Загальна сума товарів у кошику
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CART_ITEMS':
            return {
                ...state,
                items: action.payload,
                totalAmount: action.payload.reduce((acc, item) => acc + item.price * item.quantity, 0),
            };

            case 'UPDATE_CART_ITEM': {
                const updatedItems = state.items.map((item) =>
                    item.id === action.payload.id && item.language === action.payload.language
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                );
                return {
                    ...state,
                    items: updatedItems,
                    totalAmount: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
                };
            }
            


        case 'ADD_TO_CART': {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id && item.language === action.payload.language
            );
        
            let updatedItems;
        
            if (existingItem) {
                // Update quantity if the item with same id and language exists
                updatedItems = state.items.map((item) =>
                    item.id === action.payload.id && item.language === action.payload.language
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            } else {
                // Add a new entry if no match is found
                updatedItems = [...state.items, action.payload];
            }
        
            return {
                ...state,
                items: updatedItems,
                totalAmount: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            };
        }
        
        

        case 'REMOVE_FROM_CART': {
            // Remove item by id and language
            const updatedItems = state.items.filter(
                (item) => !(item.id === action.payload.id && item.language === action.payload.language)
            );
        
            return {
                ...state,
                items: updatedItems,
                totalAmount: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            };
        }
        
        
        case 'CLEAR_CART':
            return {
                ...state,
                items: [], // Очищення масиву товарів
                totalAmount: 0, // Скидання загальної суми
            };

        default:
            return state;
    }
};

export default cartReducer;




