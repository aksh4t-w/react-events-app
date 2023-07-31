import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'

const Cart = ({cart, handleCloseCart, showCart, darkMode}) => {
  const [total, setTotal] = useState(0)
  const [cartItems, setCartItems] = useState([])


  useEffect(()=>{
    const newArray = cart.cart.reduce((acc, item) => {
      const sameItem = acc.find((i) => (i.title === item.title))

      if (sameItem) sameItem.quantity++
      else acc.push({...item, quantity: 1})
      
      return acc
      }, [])


      setCartItems(newArray)
    },[cart.cart])

    useEffect(() => {
      setTotal(() => cart.cart.reduce((acc, item) => {
        acc += item.price
        return acc
      }, 0))
    
    }, [cartItems])
    

    const removeItem = (key) => {

      cart.setCart(cart.cart.filter((item) => {
        return (item.title !== key.title)
      }))

      setCartItems(() => cartItems.filter(item => item.title!==key.title))

      setTotal(()=>(total - (key.quantity * key.price)))
      console.log(total)
    }

  return (
    <Modal show={showCart} className={`promo-cart ${darkMode ? 'dark-mode' : ''}`} onHide={handleCloseCart} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Events Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
      {cart.cart? 
      <>
        <Container>
          <Row style={{fontSize: 22, fontWeight: 'bold'}}>
            <Col>Event Title</Col>
            <Col>Quantity</Col>
            <Col>Price per ticket</Col>
            <Col></Col>
          </Row>

          {cartItems?.map((item, index) => (
            <Row key={index}>
              <Col>{item.title}</Col>
              <Col>{item.quantity}</Col>
              <Col>{`$${item.price}`}</Col>
              <Col><Button onClick={() => removeItem(item)}>Remove</Button></Col>
            </Row>
            )
          )}
        </Container>
        </>
        : 
        <h4>Cart is empty.</h4>
        
      }    
      </Modal.Body>
      <Modal.Footer>
          <h4 style={{margin: "auto"}}>Total price: ${total?.toFixed(2)}</h4>
        <Button variant="secondary" onClick={handleCloseCart}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Cart






// cart.cart.map(
//   (item) => {
//     const key = item.title + "$" + item.price
//     if (!(key in cartItems2)) cartItems2[key] = 1
//     else cartItems2[key] += 1
//     setTotal(total + parseFloat(item.price))
//   })

{/* {Object.keys(cartItems).map((key, index) => (
  <Row key={index}>
    <Col>{`${key.split("$")[0]}`}</Col>
    <Col>{`${cartItems[key]}`}</Col>
    <Col>{`$${key.split("$")[1]}`}</Col>
    <Col><Button onClick={() => removeItem(key)}>Remove</Button></Col>
  </Row>
  )
)} */}