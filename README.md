# Web
Este proyecto fue generado utilizando [Create React App](https://github.com/facebook/create-react-app).
Puedes encontrar información más detallada acerca de cómo utilizar `Create React App` y muchos otros tips en [su documentación](https://facebook.github.io/create-react-app/).

## Instalación

1. Primero debes clonar el repositorio:
```sh
git clone https://github.com/eaemilio/relevic-web
```

2. Entra al directorio relevic-web
```sh
cd relevic-web
```

3. Otorga permisos para correr el script:
```sh
sudo chmod +x serve.sh
```

4. Crear variables de entorno:
```sh
nano .env
```

5. Pegar lo siguiente:
```yaml
REACT_APP_MAP_KEY=<YOUR GOOGLE MAPS KEY HERE>
REACT_APP_HOST_API_KEY=http://localhost:1938
```

6. Ejecutar shell script:
```sh
./serve.sh
```

## Servidor de desarrollo

Para crear y desplegar localmente una instancia del servidor de desarrollor ejecuta:

```sh
yarn start
```

Luego, en tu navegador dirígete a `http://localhost:8080`

>  **Nota:** La información que la aplicación recibe depende del backend, por lo que se deberá setear las variables de entorno correctas para que la aplicación conozca la URL del backend, para más información ver sección **Variables de Entorno**

## Variables de Entorno

Esta aplicación cuenta con las siguientes variables de entorno:

| Variable de Entorno | Descripción |
|--|--|
| **REACT_APP_HOST_API_KEY** | URL del backend, la aplicación utilizará dicha ruta para consultar toda la información necesaria.  |
| **PORT** | Puerto en el cual se levantará el servidor de desarrollo. |

Para setear las variables de entorno, sigue los siguientes pasos:

1. Crear un archivo `.env` en el directorio principal del proyecto.
2. Agregar las siguientes variables de entorno:
   
```yaml
PORT=8080
REACT_APP_HOST_API_KEY=https://relevic-backend.herokuapp.com
```

> **Nota Importante**: Los valores anteriores son únicamente a modo de ejemplo, deberás reemplazarlos con los valores correctos. 

## Estructura del Proyecto
El código principal se encuentra en la carpeta `src`, la cual contiene los módulos utilizados en este proyecto. Todas las páginas principales se encuentran en la carpeta `pages`, para encontrar los demás componentes, la carpeta indicada se llama `components`.

### Rutas
Puedes encontrar la configuración del Router en `src/router/index.js`, contiene todas las rutas de las plantillas.

#### Añadir una nueva ruta:
En `src/router/index.js` llamar una nueva ruta desde `src/routes/paths.js`

```javascript
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const ComponentsOverview = Loadable(lazy(() => import('../pages/ComponentsOverview')));
const Color = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationColor')));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: <LandingPage />, index: true },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        {
          path: 'components',
          children: [
            { element: <ComponentsOverview />, index: true },
            { path: 'color', element: <Color /> },
          ],
        },
      ],
    },
  ]);
}
```

Uso:
```javascript
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

// ----------------------------------------------------------------------

<Link underline="none" variant="subtitle2" component={RouterLink} to="/about-us">
  Go to About us
</Link>;
```

### Manejo de Estado

El manejo de estado ayuda a construir aplicaciones que se comportan consistentemente, corren en diferentes ambientes y son fáciles de testear. Encima de eso, provee de una gran experiencia de desarrollo.

1. Para crear un nuevo slice, debes hacerlo en `src/redux/slices/slice.js`, ejemplo:

```javascript
import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  products: []

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    }
  }
});

export default slice.reducer;

export function getProducts() {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/products');
      dispatch(slice.actions.getProductsSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
```

2. Importando el slice en `src/redux/rootReducer.js`, ejemplo:
```javascript
import { combineReducers } from 'redux';
import productReducer from './slices/product';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  product: productReducer,
});

export { rootReducer };
```

3. Uso:
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from 'src/redux/slices/product';

// ----------------------------------------------------------------------

function ProductList() {
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div> Loading... </div>
      ) : (
        <>
          {products.map((product) => (
            <div key={product.id}>
              <div>{product.name}</div>
              <div>{product.price}</div>
              <img src={product.img} alt={product.name} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
```
