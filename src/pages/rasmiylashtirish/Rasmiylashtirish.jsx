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