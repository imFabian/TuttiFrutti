<template>
    <div class="container">
        <NavBar/>
        <h2>Nosotros</h2>
        <hr>
        <div>
            <b-carousel
                id="carousel-1"
                :interval="4000"
                controls
                indicators
                background="#ababab"
                img-width="1024"
                img-height="480"
                style="text-shadow: 1px 1px 2px #333;"
                >
                <!-- Text slides with image -->
                <b-carousel-slide
                    caption="Productos frescos, saludables y naturales"
                    img-src="https://images.alphacoders.com/552/552147.jpg"
                ></b-carousel-slide>

                <b-carousel-slide
                    caption="Brindar a nuestros clientes una experiencia superior"
                    img-src="https://s1.1zoom.me/b5050/957/Autumn_Trees_Foliage_452696_1920x1080.jpg"
                ></b-carousel-slide>

                <b-carousel-slide
                    caption="Brindar calidad."
                    img-src="https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/04/01/16488064638591.jpg"
                ></b-carousel-slide>

                <b-carousel-slide
                    caption="Brindar confianza a nuestros consumidores al no utilizar preservantes."
                    img-src="https://s1.1zoom.me/b4744/911/Grapes_Closeup_536290_1920x1080.jpg"
                ></b-carousel-slide>

                </b-carousel>
        </div>
        <p>
            Frutas, verduras y hortalizas frescas a la puerta de tu casa
            Veggo trae lo mejor del campo, con una propuesta joven, fresca e innovadora.
            Nuestro propósito es contribuir en la alimentación saludable de las familias chilenas, entregando frutas, verduras y hortalizas de calidad, con un excelente servicio y responsables con el medio ambiente.
            Tenemos 3 pilares fundamentales: Calidad, Sustentabilidad, y Servicio.
        </p>
        <Footer class="mt-5"/>
    </div>
</template>
<script>
export default {
    
}
</script>