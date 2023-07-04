const { createApp } = Vue
  createApp({
    data() {
      return {
        articulos:[],
        url:'http://localhost:5000/articulos', 
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        titulo:"",
        descripcion:"",
        category:"",
        subcategory:"",
        precio:0,
        cantidad:0,
        image:"",
        cuotas:0,
        descuento:0,
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.articulos = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(articulo) {

            var opcion = confirm("¿Está seguro de eliminar el articulo " + articulo + " ?");
            
            if (opcion == null || opcion == "") {
                    mensaje = "Has cancelado";
                    
                } else {
                    const url = this.url+'/' + articulo;
                    var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
                }
            },
        grabar(){
            let articulo = {
                titulo:this.titulo,
                descripcion:this.descripcion,
                category:this.category,
                subcategory:this.subcategory,
                precio:this.precio,
                cantidad:this.cantidad,
                image:this.image,
                cuotas:this.cuotas,
                descuento:this.descuento
            }


            if (!articulo.titulo || !articulo.descripcion || !articulo.category || !articulo.subcategory || !articulo.precio || !articulo.cantidad || !articulo.image || !articulo.cuotas || !articulo.descuento) {
                alert("Por favor, completa los campos obligatorios");
                return;
            }



            var options = {
                body:JSON.stringify(articulo),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Articulo agregado con éxito")
                    window.location.href = "./articulos.html";  
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al guardar cambios")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')