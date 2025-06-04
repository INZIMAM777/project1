//hero_section
        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function () {
            const scrollPosition = window.pageYOffset;
            const heroVideo = document.getElementById('h_video');
            heroVideo.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        });

        // navigation menu toggle for mobile
        // Toggle navigation menu on hamburger click
        const hamburger = document.getElementById('hamburger');
        const navUL = document.getElementById('nav_ul');
        const navLinks = document.querySelectorAll('#nav_ul a');

        hamburger.addEventListener('click', () => {
            navUL.classList.toggle('active');
        });

        // Close nav menu after clicking a link (on mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navUL.classList.remove('active');
                }
            });
        });



        //contact.............

        document.querySelectorAll('.input-group input, .input-group textarea, .input-group select').forEach(element => {
            element.addEventListener('focus', function () {
                this.parentNode.querySelector('label').classList.add('active');
                this.parentNode.querySelector('.bar').classList.add('active');
            });

            element.addEventListener('blur', function () {
                if (!this.value) {
                    this.parentNode.querySelector('label').classList.remove('active');
                }
                this.parentNode.querySelector('.bar').classList.remove('active');
            });

            // Initialize labels if fields are pre-filled
            if (element.value) {
                element.parentNode.querySelector('label').classList.add('active');
            }
        });

        // Form submission
        document.getElementById('contactDarkForm').addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your enquiry. Our diamond specialist will contact you shortly.');
            this.reset();
            document.querySelectorAll('.input-group label').forEach(label => {
                label.classList.remove('active');
            });
        });
// (CSS code removed; place this in a .css file instead)


let cart = [];
        const cartIcon = document.getElementById('cart-icon');
        const cartContainer = document.getElementById('cart-container');
        const overlay = document.getElementById('overlay');
        const closeCartBtn = document.getElementById('close-cart');
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart');
        const cartFooter = document.getElementById('cart-footer');
        const cartCountElement = document.getElementById('cart-count');
        const checkoutBtn = document.getElementById('checkout-btn');

        // Toggle cart
        cartIcon.addEventListener('click', () => {
            cartContainer.classList.add('open');
            overlay.classList.add('active');
        });

        closeCartBtn.addEventListener('click', () => {
            cartContainer.classList.remove('open');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', () => {
            cartContainer.classList.remove('open');
            overlay.classList.remove('active');
        });

        function addToCart(button) {
            const product = {
                name: button.getAttribute('data-name'),
                price: parseFloat(button.getAttribute('data-price')),
                img: button.getAttribute('data-img'),
                quantity: 1
            };

            // Check if product already in cart
            const existingItem = cart.find(item => item.name === product.name);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(product);
            }

            updateCart();
            updateProductCount(button);
            animateCartIcon();
        }

        function animateCartIcon() {
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 300);
        }

        function updateCart() {
            // Update cart count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;

            // Update cart items
            cartItemsContainer.innerHTML = '';
            
            if (cart.length === 0) {
                emptyCartMessage.style.display = 'block';
                cartFooter.style.display = 'none';
            } else {
                emptyCartMessage.style.display = 'none';
                cartFooter.style.display = 'block';

                let total = 0;
                
                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;

                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            <div class="cart-item-controls">
                                <button class="quantity-btn" onclick="changeQuantity('${item.name}', -1)">-</button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn" onclick="changeQuantity('${item.name}', 1)">+</button>
                                <button class="remove-btn" onclick="removeItem('${item.name}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });

                document.getElementById('cart-total').textContent = total.toFixed(2);
            }
        }

        function changeQuantity(name, change) {
            const item = cart.find(item => item.name === name);
            if (item) {
                item.quantity += change;
                
                if (item.quantity <= 0) {
                    cart = cart.filter(item => item.name !== name);
                }
                
                updateCart();
                updateAllProductCounts();
            }
        }

        function removeItem(name) {
            cart = cart.filter(item => item.name !== name);
            updateCart();
            updateAllProductCounts();
        }

        function updateProductCount(button) {
            const name = button.getAttribute('data-name');
            const item = cart.find(item => item.name === name);
            const countDisplay = button.nextElementSibling;
            
            if (item) {
                countDisplay.setAttribute('data-count', item.quantity);
                countDisplay.textContent = `Added: ${item.quantity}`;
            }
        }

        function updateAllProductCounts() {
            document.querySelectorAll('.cta-button').forEach(button => {
                updateProductCount(button);
            });
        }

        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            // Create WhatsApp message
            let message = "Hello Diamond Jewellery,\n\n";
            message += "I would like to purchase the following items:\n\n";
            
            cart.forEach(item => {
                message += `✔ ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}\n`;
            });
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            message += `\nTotal: $${total.toFixed(2)}\n\n`;
            message += "Please confirm availability and payment details. Thank you!";
            
            // Encode message for WhatsApp
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/9043531165?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Close cart
            cartContainer.classList.remove('open');
            overlay.classList.remove('active');
            
            // Optional: Clear cart after purchase
            // cart = [];
            // updateCart();
            // updateAllProductCounts();
        });
        