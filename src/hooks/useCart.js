import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";

export function useCart(){
    const [data] = useState(db);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ?? []);
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    function addToCart(item){
        const itemExists = cart.findIndex(guitar => guitar.id === item.id);
        if(itemExists >= 0){
        const updatedCart = [...cart];
        updatedCart[itemExists].quantity++;
        setCart(updatedCart);
        }else{
        item.quantity = 1;
        setCart(prevCart => [...prevCart, item]);
        }

    }

    function removeFromCart(idGuitar){
        const newCart = cart.filter(item => item.id != idGuitar);
        setCart(newCart);
    }

    function incrementQuantity(idGuitar){
        const itemIndex = cart.findIndex(guitar => guitar.id === idGuitar);
        const updatedCart = [...cart];
        updatedCart[itemIndex].quantity++;
        setCart(updatedCart);
    }

    function decrementQuantity(idGuitar){
        const itemIndex = cart.findIndex(guitar => guitar.id === idGuitar);
        const updatedCart = [...cart];

        if(updatedCart[itemIndex].quantity <= MIN_ITEMS) return
        updatedCart[itemIndex].quantity--;
        setCart(updatedCart);
    }

    function cleanCart(){
        setCart([]);
    }

    //State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((acc, current) => acc + (current.quantity * current.price), 0), [cart]);


    return {
        cart,
        data,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        cleanCart,
        isEmpty,
        cartTotal
    }
}