import { useContext } from 'react';
import { FirebaseContext } from '../contexts/FirebaseContext';

const useFirebase = () => {
  const context = useContext(FirebaseContext);

  if (!context) throw new Error('Firebase context must be use inside FirebaseProvider');

  return context;
};

export default useFirebase;
