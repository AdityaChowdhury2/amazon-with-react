import firebaseConfig from './firebase.config';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


export const initializeLoginFramework = () => {
    const app = initializeApp(firebaseConfig);

}

export const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, googleProvider)
        .then(result => {
            const { displayName, email, photoURL } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
            //console.log(email, displayName, photoURL);
        })
}
export const handleFbLogin = () => {
    const facebookProvider = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, facebookProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            user.success = true;
            return user;
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
}
export const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth).then(res => {
        const signedOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: '',
            error: '',
            success: false
        }
        return signedOutUser;
    })
        .catch(error => {
            console.log(error);
        });
}
export const handleCreateUserWithEmailAndPassword = (name, email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            const newUserInfo = user;
            newUserInfo.success = true;
            newUserInfo.error = '';
            updateUserInfo(name);
            return newUserInfo;

        }).catch((error) => {
            // debugger;
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
            // console.log(error.message)
        });
}
export const handleSignInWithEmailAndPassword = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            const newUserInfo = user;
            newUserInfo.success = true;
            newUserInfo.error = '';
            return newUserInfo;

            // console.log(user);
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}
const updateUserInfo = name => {
    const auth = getAuth();
    const user = auth.currentUser;
    updateProfile(user, {
        displayName: name
    }).then(() => {
        console.log('User Name updated successfully');
    })
        .catch((error) => {
            console.log(error);
        })
}