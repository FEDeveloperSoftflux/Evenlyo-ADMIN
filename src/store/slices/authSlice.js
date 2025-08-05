import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock credentials
const MOCK_CREDENTIALS = {
  email: 'hammad.abbasi211@gmail.com',
  password: 'password123'
};

// Async thunk for login
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials
      if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
        const user = {
          id: 1,
          email: email,
          name: 'Admin User',
          role: 'admin'
        };

        // Store in localStorage
        localStorage.setItem('adminToken', 'mock-jwt-token');
        localStorage.setItem('adminUser', JSON.stringify(user));

        return user;
      } else {
        return rejectWithValue('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

// Async thunk for logout
export const logoutAdmin = createAsyncThunk(
  'auth/logoutAdmin',
  async () => {
    // Clear localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    return null;
  }
);

// Initial state
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Check if user is already logged in
const checkAuthState = () => {
  const token = localStorage.getItem('adminToken');
  const user = localStorage.getItem('adminUser');

  if (token && user) {
    return {
      user: JSON.parse(user),
      token,
      isAuthenticated: true,
    };
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

// Initialize state with existing auth data
const authState = checkAuthState();
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    ...authState,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = 'mock-jwt-token';
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Logout cases
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
