<script context="module">
  import firebase from 'firebase/app';
import GlobalStyle from '../components/GlobalStyle.svelte';
import Modal from 'svelte-simple-modal';
  
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  };
  firebase.initializeApp(firebaseConfig);
</script>

<GlobalStyle />

<Modal>
  <main>
    <slot></slot>
  </main>
</Modal>