        const images = [
            'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1000&h=400&fit=crop',
            'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1000&h=400&fit=crop',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&h=400&fit=crop'
        ];

        function changeImage(index) {
          
            document.getElementById('mainImage').src = images[index];
            
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }

        function bookTrip() {
            alert('stuff should happen here  ');
        }