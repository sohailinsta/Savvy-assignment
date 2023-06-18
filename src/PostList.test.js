import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PostList from './PostList';
import '@testing-library/jest-dom/extend-expect';


jest.mock('axios'); // Mock axios module

describe('PostList', () => {
  beforeEach(() => {
    axios.get.mockReset(); // Reset axios mock before each test
  });

  test('fetches and displays posts', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', body: 'Lorem ipsum dolor sit amet.' },
      { id: 2, title: 'Post 2', body: 'Consectetur adipiscing elit.' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockPosts }); // Mock successful response

    const { getByText } = render(<PostList />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
      expect(getByText('Post 1')).toBeInTheDocument();
      expect(getByText('Post 2')).toBeInTheDocument();
    });
  });

  test('displays error message when fetching posts fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch posts')); // Mock failed response

    const { getByText } = render(<PostList />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
      expect(getByText('An error occurred while fetching posts.')).toBeInTheDocument();
    });
  });

  test('filters posts based on search query', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', body: 'Lorem ipsum dolor sit amet.' },
      { id: 2, title: 'Post 2', body: 'Consectetur adipiscing elit.' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockPosts });

    const { getByPlaceholderText, getByText, queryByText } = render(<PostList />);

    await waitFor(() => {
      expect(getByText('Post 1')).toBeInTheDocument();
      expect(getByText('Post 2')).toBeInTheDocument();
    });

    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Lorem' } });

    expect(queryByText('Post 1')).toBeInTheDocument();
    expect(queryByText('Post 2')).not.toBeInTheDocument();
  });

  
  
});
