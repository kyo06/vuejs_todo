<template>
    <div class="not-found">
        <h1>404</h1>
        <p>Page non trouvée</p>
        <router-link to="/">Retour à la page d'accueil</router-link>
    </div>
</template>

<style scoped>
.not-found {
    text-align: center;
    padding: 50px;
}

h1 {
    font-size: 72px;
    color: #ff5722;
    margin: 0;
}

p {
    font-size: 24px;
    color: #666;
    margin: 20px 0;
}

a {
    color: #4CAF50;
    text-decoration: none;
    font-size: 18px;
}

a:hover {
    text-decoration: underline;
}
</style>
