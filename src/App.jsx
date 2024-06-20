import Header from "./Components/Header"
import Guitar from "./Components/Guitar"
import { db } from "./data/db"
import { useEffect, useState } from "react"

function App() {
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

  return (
    <>
        <Header
          cart={cart}
          removeFromCart={removeFromCart}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          cleanCart={cleanCart}
        ></Header>

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
              {
                data.map((guitar) => (
                  <Guitar 
                    key={guitar.id}
                    guitar={guitar}
                    addToCart={addToCart}
                  />   
                  )
                )
              }
            </div>
        </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
