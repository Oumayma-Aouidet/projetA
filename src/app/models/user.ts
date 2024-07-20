export interface User {
    id: number;
    username: string;
    password?: string; // Si vous souhaitez inclure le mot de passe
    role: string;
  }
  