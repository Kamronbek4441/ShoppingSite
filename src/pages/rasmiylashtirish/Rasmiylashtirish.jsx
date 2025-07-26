import React, { useState } from 'react';
import "./Rasmiylashtirish.css";

const Rasmiylashtirish = ({ cartItems, setCartItems }) => {
    const [formData, setFormData] = useState({ name: '', phone: '' });

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const botToken = '7740724554:AAGQdqMs7sd3bnSACV_iJc2k5h8NxlaP2tA';
        const chatId = '5764570183';

        let itemsText = cartItems.map(item => (
            `📦 ${item.name} - ${item.quantity} dona - ${item.price}$`
        )).join('\n');

        const message = `
🛒 Yangi buyurtma!
👤 Ism: ${formData.name}
📞 Tel: ${formData.phone}

Mahsulotlar:
${itemsText}

💰 Jami: ${calculateTotal()}$
        `;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        }).then(response => {
            if (response.ok) {
                alert('Buyurtmangiz yuborildi!');
                setCartItems([]);
                localStorage.removeItem("cart");
            } else {
                alert('Xatolik yuz berdi.');
            }
        });
    };

    return (
        <div>
            <div className="checkout-container">
                <h2>Buyurtmani Rasmiylashtirish</h2>
                <form id="orderForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Ismingiz</label>
                        <input type="text" id="name" name="name" required placeholder="Ismingizni kiriting" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Telefon raqami</label>
                        <input type="tel" id="phone" name="phone" required placeholder="+998 xx xxx xx xx" value={formData.phone} onChange={handleChange} />
                    </div>

                    <div className="cart-summary">
                        <h3>Mahsulotlar:</h3>
                        {cartItems.length === 0 ? (
                            <p>Savat bo‘sh</p>
                        ) : (
                            cartItems.map((item, index) => (
                                <p key={index}>{item.name} - {item.quantity} dona - {item.price}$</p>
                            ))
                        )}
                        <strong>Jami: {calculateTotal()}$</strong>
                    </div>

                    <button type="submit" className="submit-btn">Buyurtma berish</button>
                </form>
            </div>
        </div>
    );
};

export default Rasmiylashtirish;


// import React, { useEffect, useState } from 'react';
// import "./Rasmiylashtirish.css";

// const Rasmiylashtirish = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const [formData, setFormData] = useState({ name: '', phone: '' });

//     useEffect(() => {
//         const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
//         setCartItems(storedCart);
//     }, []);

//     const calculateTotal = () => {
//         return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const botToken = 'YOUR_BOT_TOKEN';
//         const chatId = 'YOUR_CHAT_ID';

//         let itemsText = cartItems.map(item => (
//             `📦 ${item.name} - ${item.quantity} dona - ${item.price}$`
//         )).join('\n');

//         const message = `
// 🛒 Yangi buyurtma!
// 👤 Ism: ${formData.name}
// 📞 Tel: ${formData.phone}

// Mahsulotlar:
// ${itemsText}

// 💰 Jami: ${calculateTotal()}$
//         `;

//         await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 chat_id: chatId,
//                 text: message
//             })
//         }).then(response => {
//             if (response.ok) {
//                 alert('Buyurtmangiz yuborildi!');
//                 localStorage.removeItem('cartItems'); // Savatni tozalash
//                 setCartItems([]); // UI dan ham o‘chirish
//             } else {
//                 alert('Xatolik yuz berdi.');
//             }
//         });
//     };

//     return (
//         <div>
//             <div className="checkout-container">
//                 <h2>Buyurtmani Rasmiylashtirish</h2>
//                 <form id="orderForm" onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="name">Ismingiz</label>
//                         <input type="text" id="name" name="name" required placeholder="Ismingizni kiriting" value={formData.name} onChange={handleChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="phone">Telefon raqami</label>
//                         <input type="tel" id="phone" name="phone" required placeholder="+998 xx xxx xx xx" value={formData.phone} onChange={handleChange} />
//                     </div>

//                     <div className="cart-summary">
//                         <h3>Mahsulotlar:</h3>
//                         {cartItems.length === 0 ? (
//                             <p>Savat bo‘sh</p>
//                         ) : (
//                             cartItems.map((item, index) => (
//                                 <p key={index}>{item.name} - {item.quantity} dona - {item.price}$</p>
//                             ))
//                         )}
//                         <strong>Jami: {calculateTotal()}$</strong>
//                     </div>

//                     <button type="submit" className="submit-btn">Buyurtma berish</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Rasmiylashtirish;


// // import React, { useEffect, useState } from 'react';
// // import "./Rasmiylashtirish.css";

// // const Rasmiylashtirish = () => {
// //     const [cartItems, setCartItems] = useState([]);
// //     const [formData, setFormData] = useState({ name: '', phone: '' });

// //     useEffect(() => {
// //         const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
// //         setCartItems(storedCart);
// //     }, []);

// //     const calculateTotal = () => {
// //         return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
// //     };

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         const botToken = 'YOUR_BOT_TOKEN';
// //         const chatId = 'YOUR_CHAT_ID';

// //         let itemsText = cartItems.map(item => (
// //             `📦 ${item.name} - ${item.quantity} dona - ${item.price}$`
// //         )).join('\n');

// //         const message = `
// // 🛒 Yangi buyurtma!
// // 👤 Ism: ${formData.name}
// // 📞 Tel: ${formData.phone}

// // Mahsulotlar:
// // ${itemsText}

// // 💰 Jami: ${calculateTotal()}$
// //         `;

// //         await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({
// //                 chat_id: chatId,
// //                 text: message
// //             })
// //         }).then(response => {
// //             if (response.ok) {
// //                 alert('Buyurtmangiz yuborildi!');
// //                 localStorage.removeItem('cartItems'); // Savatni tozalash
// //                 setCartItems([]); // Frontend UI savatni tozalash
// //             } else {
// //                 alert('Xatolik yuz berdi.');
// //             }
// //         });
// //     };

// //     return (
// //         <div>
// //             <div className="checkout-container">
// //                 <h2>Buyurtmani Rasmiylashtirish</h2>
// //                 <form id="orderForm" onSubmit={handleSubmit}>
// //                     <div className="form-group">
// //                         <label htmlFor="name">Ismingiz</label>
// //                         <input type="text" id="name" name="name" required placeholder="Ismingizni kiriting" value={formData.name} onChange={handleChange} />
// //                     </div>
// //                     <div className="form-group">
// //                         <label htmlFor="phone">Telefon raqami</label>
// //                         <input type="tel" id="phone" name="phone" required placeholder="+998 xx xxx xx xx" value={formData.phone} onChange={handleChange} />
// //                     </div>

// //                     <div className="cart-summary">
// //                         <h3>Mahsulotlar:</h3>
// //                         {cartItems.length === 0 ? (
// //                             <p>Savat bo‘sh</p>
// //                         ) : (
// //                             cartItems.map((item, index) => (
// //                                 <p key={index}>{item.name} - {item.quantity} dona - {item.price}$</p>
// //                             ))
// //                         )}
// //                         <strong>Jami: {calculateTotal()}$</strong>
// //                     </div>

// //                     <button type="submit" className="submit-btn">Buyurtma berish</button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Rasmiylashtirish;


// // // import React, { useEffect, useState } from 'react';
// // // import "./Rasmiylashtirish.css";

// // // const Rasmiylashtirish = () => {
// // //     const [cartItems, setCartItems] = useState([]);
// // //     const [formData, setFormData] = useState({
// // //         name: '',
// // //         phone: ''
// // //     });

// // //     useEffect(() => {
// // //         const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
// // //         setCartItems(storedCart);
// // //     }, []);

// // //     const calculateTotal = () => {
// // //         return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
// // //     };

// // //     const handleChange = (e) => {
// // //         setFormData({ ...formData, [e.target.name]: e.target.value });
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();

// // //         const botToken = 'YOUR_BOT_TOKEN';
// // //         const chatId = 'YOUR_CHAT_ID';

// // //         let itemsText = cartItems.map(item => (
// // //             `📦 ${item.name} - ${item.quantity} dona - ${item.price}$`
// // //         )).join('\n');

// // //         const message = `
// // // 🛒 Yangi buyurtma!
// // // 👤 Ism: ${formData.name}
// // // 📞 Tel: ${formData.phone}

// // // Mahsulotlar:
// // // ${itemsText}

// // // 💰 Jami: ${calculateTotal()}$
// // //         `;

// // //         await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
// // //             method: 'POST',
// // //             headers: { 'Content-Type': 'application/json' },
// // //             body: JSON.stringify({
// // //                 chat_id: chatId,
// // //                 text: message
// // //             })
// // //         }).then(response => {
// // //             if (response.ok) {
// // //                 alert('Buyurtmangiz yuborildi!');
// // //                 localStorage.removeItem('cartItems'); // Savatni tozalash
// // //             } else {
// // //                 alert('Xatolik yuz berdi.');
// // //             }
// // //         });
// // //     };

// // //     return (
// // //         <div>
// // //             <div className="checkout-container">
// // //                 <h2>Buyurtmani Rasmiylashtirish</h2>
// // //                 <form id="orderForm" onSubmit={handleSubmit}>
// // //                     <div className="form-group">
// // //                         <label htmlFor="name">Ismingiz</label>
// // //                         <input type="text" id="name" name="name" required placeholder="Ismingizni kiriting" value={formData.name} onChange={handleChange} />
// // //                     </div>
// // //                     <div className="form-group">
// // //                         <label htmlFor="phone">Telefon raqami</label>
// // //                         <input type="tel" id="phone" name="phone" required placeholder="+998 xx xxx xx xx" value={formData.phone} onChange={handleChange} />
// // //                     </div>

// // //                     <div className="cart-summary">
// // //                         <h3>Mahsulotlar:</h3>
// // //                         {cartItems.length === 0 ? (
// // //                             <p>Savat bo‘sh</p>
// // //                         ) : (
// // //                             cartItems.map((item, index) => (
// // //                                 <p key={index}>{item.name} - {item.quantity} dona - {item.price}$</p>
// // //                             ))
// // //                         )}
// // //                         <strong>Jami: {calculateTotal()}$</strong>
// // //                     </div>

// // //                     <button type="submit" className="submit-btn">Buyurtma berish</button>
// // //                 </form>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // export default Rasmiylashtirish;


// // // // import React, { useEffect, useState } from 'react';
// // // // import { useLocation } from 'react-router-dom';
// // // // import "./Rasmiylashtirish.css";

// // // // const Rasmiylashtirish = () => {
// // // //     const location = useLocation();
// // // //     const [formData, setFormData] = useState({
// // // //         name: '',
// // // //         phone: '',
// // // //         product: '',
// // // //         price: '',
// // // //         quantity: '',
// // // //         total: ''
// // // //     });

// // // //     useEffect(() => {
// // // //         const params = new URLSearchParams(location.search);
// // // //         const product = params.get('product') || '';
// // // //         const price = params.get('price') || '';
// // // //         const quantity = params.get('quantity') || '';
// // // //         const total = params.get('total') || '';

// // // //         setFormData(prev => ({ ...prev, product, price, quantity, total }));
// // // //     }, [location.search]);

// // // //     const handleChange = (e) => {
// // // //         setFormData({ ...formData, [e.target.name]: e.target.value });
// // // //     };

// // // //     const handleSubmit = async (e) => {
// // // //         e.preventDefault();

// // // //         const botToken = 'YOUR_BOT_TOKEN';
// // // //         const chatId = 'YOUR_CHAT_ID';

// // // //         const message = `
// // // // 🛒 Yangi buyurtma!
// // // // 👤 Ism: ${formData.name}
// // // // 📞 Tel: ${formData.phone}
// // // // 📦 Mahsulot: ${formData.product}
// // // // 🔢 Soni: ${formData.quantity}
// // // // 💵 Narxi: ${formData.price}
// // // // 💰 Jami: ${formData.total}
// // // //         `;

// // // //         await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
// // // //             method: 'POST',
// // // //             headers: { 'Content-Type': 'application/json' },
// // // //             body: JSON.stringify({
// // // //                 chat_id: chatId,
// // // //                 text: message
// // // //             })
// // // //         }).then(response => {
// // // //             if (response.ok) {
// // // //                 alert('Buyurtmangiz yuborildi!');
// // // //             } else {
// // // //                 alert('Xatolik yuz berdi.');
// // // //             }
// // // //         });
// // // //     };

// // // //     return (
// // // //         <div>
// // // //             <div className="checkout-container">
// // // //                 <h2>Buyurtmani Rasmiylashtirish</h2>
// // // //                 <form id="orderForm" onSubmit={handleSubmit}>
// // // //                     <div className="form-group">
// // // //                         <label htmlFor="name">Ismingiz</label>
// // // //                         <input type="text" id="name" name="name" required placeholder="Ismingizni kiriting" value={formData.name} onChange={handleChange} />
// // // //                     </div>
// // // //                     <div className="form-group">
// // // //                         <label htmlFor="phone">Telefon raqami</label>
// // // //                         <input type="tel" id="phone" name="phone" required placeholder="+998 xx xxx xx xx" value={formData.phone} onChange={handleChange} />
// // // //                     </div>
// // // //                     <div className="form-group">
// // // //                         <label htmlFor="product">Mahsulot nomi</label>
// // // //                         <input type="text" id="product" name="product" required value={formData.product} onChange={handleChange} />
// // // //                     </div>
// // // //                     <div className="form-group">
// // // //                         <label htmlFor="price">Mahsulot narxi</label>
// // // //                         <input type="number" id="price" name="price" required value={formData.price} onChange={handleChange} />
// // // //                     </div>
// // // //                     <div className="form-group">
// // // //                         <label htmlFor="quantity">Soni</label>
// // // //                         <input type="number" id="quantity" name="quantity" required value={formData.quantity} onChange={handleChange} />
// // // //                     </div>
// // // //                     <div className="form-group">
// // // //                         <label htmlFor="total">Jami Narxi</label>
// // // //                         <input type="number" id="total" name="total" required value={formData.total} onChange={handleChange} readOnly />
// // // //                     </div>
// // // //                     <button type="submit" className="submit-btn">Buyurtma berish</button>
// // // //                 </form>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default Rasmiylashtirish;


// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { useLocation } from 'react-router-dom';
// // // // // import "./Rasmiylashtirish.css";

// // // // // const Rasmiylashtirish = () => {
// // // // //     const location = useLocation();
// // // // //     const [formData, setFormData] = useState({
// // // // //         name: '',
// // // // //         phone: '',
// // // // //         product: '',
// // // // //         price: '',
// // // // //         quantity: ''
// // // // //     });

// // // // //     useEffect(() => {
// // // // //         const params = new URLSearchParams(location.search);
// // // // //         const product = params.get('product') || '';
// // // // //         const price = params.get('price') || '';
// // // // //         const quantity = params.get('quantity') || '';
        
// // // // //         setFormData(prev => ({ ...prev, product, price, quantity }));
// // // // //     }, [location.search]);

// // // // //     const handleChange = (e) => {
// // // // //         setFormData({ ...formData, [e.target.name]: e.target.value });
// // // // //     };

// // // // //     const handleSubmit = async (e) => {
// // // // //         e.preventDefault();

// // // // //         const botToken = '7740724554:AAGQdqMs7sd3bnSACV_iJc2k5h8NxlaP2tA';
// // // // //         const chatId = '5764570183';

// // // // //         const message = `
// // // // // 🛒 Yangi buyurtma!
// // // // // 👤 Ism: ${formData.name}
// // // // // 📞 Tel: ${formData.phone}
// // // // // 📦 Mahsulot: ${formData.product}
// // // // // 🔢 Soni: ${formData.quantity}
// // // // // 💵 Narxi: ${formData.price}
// // // // //         `;

// // // // //         await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
// // // // //             method: 'POST',
// // // // //             headers: { 'Content-Type': 'application/json' },
// // // // //             body: JSON.stringify({
// // // // //                 chat_id: chatId,
// // // // //                 text: message
// // // // //             })
// // // // //         }).then(response => {
// // // // //             if (response.ok) {
// // // // //                 alert('Buyurtmangiz yuborildi!');
// // // // //             } else {
// // // // //                 alert('Xatolik yuz berdi.');
// // // // //             }
// // // // //         });
// // // // //     };

// // // // //     return (
// // // // //         <div>
// // // // //             <div className="checkout-container">
// // // // //                 <h2>Buyurtmani Rasmiylashtirish</h2>
// // // // //                 <form id="orderForm" onSubmit={handleSubmit}>
// // // // //                     <div className="form-group">
// // // // //                         <label htmlFor="name">Ismingiz</label>
// // // // //                         <input type="text" id="name" name="name" required placeholder="Ismingizni kiriting" value={formData.name} onChange={handleChange} />
// // // // //                     </div>
// // // // //                     <div className="form-group">
// // // // //                         <label htmlFor="phone">Telefon raqami</label>
// // // // //                         <input type="tel" id="phone" name="phone" required placeholder="+998 xx xxx xx xx" value={formData.phone} onChange={handleChange} />
// // // // //                     </div>
// // // // //                     <div className="form-group">
// // // // //                         <label htmlFor="product">Mahsulot nomi</label>
// // // // //                         <input type="text" id="product" name="product" required value={formData.product} onChange={handleChange} />
// // // // //                     </div>
// // // // //                     <div className="form-group">
// // // // //                         <label htmlFor="price">Mahsulot narxi</label>
// // // // //                         <input type="number" id="price" name="price" required value={formData.price} onChange={handleChange} />
// // // // //                     </div>
// // // // //                     <div className="form-group">
// // // // //                         <label htmlFor="quantity">Soni</label>
// // // // //                         <input type="number" id="quantity" name="quantity" required value={formData.quantity} onChange={handleChange} />
// // // // //                     </div>
// // // // //                     <button type="submit" className="submit-btn">Buyurtma berish</button>
// // // // //                 </form>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // export default Rasmiylashtirish;


// // // // // // import React from 'react';
// // // // // // import "./Rasmiylashtirish.css";

// // // // // // const Rasmiylashtirish = () => {

// // // // // //     const handleSubmit = async (e) => {
// // // // // //         e.preventDefault();

// // // // // //         const name = document.getElementById('name').value;
// // // // // //         const phone = document.getElementById('phone').value;
// // // // // //         const product = document.getElementById('product').value;
// // // // // //         const price = document.getElementById('price').value;

// // // // // //         const botToken = '7740724554:AAGQdqMs7sd3bnSACV_iJc2k5h8NxlaP2tA';
// // // // // //         const chatId = '5764570183';

// // // // // //         const message = `
// // // // // // 🛒 Yangi buyurtma!
// // // // // // 👤 Ism: ${name}
// // // // // // 📞 Tel: ${phone}
// // // // // // 📦 Mahsulot: ${product}
// // // // // // 💵 Narxi: ${price}
// // // // // //         `;

// // // // // //         await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
// // // // // //             method: 'POST',
// // // // // //             headers: { 'Content-Type': 'application/json' },
// // // // // //             body: JSON.stringify({
// // // // // //                 chat_id: chatId,
// // // // // //                 text: message
// // // // // //             })
// // // // // //         }).then(response => {
// // // // // //             if (response.ok) {
// // // // // //                 alert('Buyurtmangiz yuborildi!');
// // // // // //                 document.getElementById('orderForm').reset();
// // // // // //             } else {
// // // // // //                 alert('Xatolik yuz berdi. Qayta urinib ko‘ring.');
// // // // // //             }
// // // // // //         });
// // // // // //     }

// // // // // //     return (
// // // // // //         <div>
// // // // // //             <div className="checkout-container">
// // // // // //                 <h2>Buyurtmani Rasmiylashtirish</h2>
// // // // // //                 <form id="orderForm" onSubmit={handleSubmit}>
// // // // // //                     <div className="form-group">
// // // // // //                         <label htmlFor="name">Ismingiz</label>
// // // // // //                         <input type="text" id="name" name="name" required placeholder="Ismingizni kiriting" />
// // // // // //                     </div>
// // // // // //                     <div className="form-group">
// // // // // //                         <label htmlFor="phone">Telefon raqami</label>
// // // // // //                         <input type="tel" id="phone" name="phone" required placeholder="+998 xx xxx xx xx" />
// // // // // //                     </div>
// // // // // //                     <div className="form-group">
// // // // // //                         <label htmlFor="product">Mahsulot nomi</label>
// // // // // //                         <input type="text" id="product" name="product" required placeholder="Mahsulot nomi" />
// // // // // //                     </div>
// // // // // //                     <div className="form-group">
// // // // // //                         <label htmlFor="price">Mahsulot narxi</label>
// // // // // //                         <input type="number" id="price" name="price" required placeholder="Mahsulot narxi" />
// // // // // //                     </div>
// // // // // //                     <button type="submit" className="submit-btn">Buyurtma berish</button>
// // // // // //                 </form>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // }

// // // // // // export default Rasmiylashtirish;


// // // // // // // import React from 'react'
// // // // // // // import "./Rasmiylashtirish.css"

// // // // // // // const Rasmiylashtirish = () => {
// // // // // // //     return (
// // // // // // //         <div>
// // // // // // //             <div class="checkout-container">
// // // // // // //                 <h2>Buyurtmani Rasmiylashtirish</h2>
// // // // // // //                 <form id="orderForm">
// // // // // // //                     <div class="form-group">
// // // // // // //                         <label for="name">Ismingiz</label>
// // // // // // //                         <input type="text" id="name" name="name" required placeholder="Ismingizni kiriting" />
// // // // // // //                     </div>
// // // // // // //                     <div class="form-group">
// // // // // // //                         <label for="phone">Telefon raqami</label>
// // // // // // //                         <input type="tel" id='phone' name='phone' required placeholder='+998 xx xxx xx xx' />
// // // // // // //                     </div>
// // // // // // //                     <div class="form-group">
// // // // // // //                         <label for="product">Mahsulot nomi</label>
// // // // // // //                         <input type="text" id="product" name="product" required placeholder="Mahsulot nomi" />
// // // // // // //                     </div>
// // // // // // //                     <button type="submit" class="submit-btn">Buyurtma berish</button>
// // // // // // //                 </form>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     )
// // // // // // // }

// // // // // // // export default Rasmiylashtirish




