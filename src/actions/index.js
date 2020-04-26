import fetch from 'isomorphic-fetch';

const baseURL = 'http://localhost:3000';

const headersJSON = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function addTodo (todo) {
  return dispatch => {
    dispatch({ type: 'ADD_TODO_REQUEST' });

    const headers = headersJSON();
    const endpoint = `${baseURL}/todos`;
    const method = 'POST';
    const body = JSON.stringify(todo);

    return fetch(endpoint, { method, headers, body })
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
        dispatch({ data, type: 'ADD_TODO_SUCCESS' });
      })
      .catch(error => {
        dispatch({ error, type: 'ADD_TODO_FAILURE' });
      });
  }
}

export function deleteTodo (todo) {
  const id = todo.id;

  return dispatch => {
    dispatch({ type: 'DELETE_TODO_REQUEST' })

    const headers = headersJSON();
    const endpoint = `${baseURL}/todos/${id}`;
    const method = 'DELETE';

    return fetch(endpoint, { method, headers })
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
        dispatch({ id, type: 'DELETE_TODO_SUCCESS' })
      })
      .catch(error => {
        dispatch({ error, type: 'DELETE_TODO_FAILURE' })
      });
  };
}

export function editTodo (todo) {
  return dispatch => {
    dispatch({ type: 'EDIT_TODO_REQUEST' })

    const headers = headersJSON();
    const endpoint = `${baseURL}/todos/${todo.id}`;
    const method = 'PUT';
    const body = JSON.stringify(Object.assign({}, todo));

    return fetch(endpoint, { method, headers, body })
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
        dispatch({ data, type: 'EDIT_TODO_SUCCESS' })
      })
      .catch(error => {
        dispatch({ error, type: 'EDIT_TODO_FAILURE' })
      });
  };
}

export function fetchTodos (params={}) {
  return dispatch => {
    dispatch({ type: 'FETCH_TODOS_REQUEST' });
    let endpoint = `${baseURL}/todos`;
    if(Object.keys(params).length){
      Object.keys(params).forEach((key,i)=>{
        endpoint =endpoint.concat(`${i == 0 ? '?' : '&'}${key}=${params[key]}`);
      })
    }
    const headers = headersJSON();

    return fetch(endpoint, { headers })
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
        dispatch({ data, type: 'FETCH_TODOS_SUCCESS' });
      })
      .catch(error => {
        dispatch({ error, type: 'FETCH_TODOS_FAILURE' });
      })
  }
}

export function fetchTodosIfNeeded () {
  return (dispatch, getState) => {
    if (shouldFetchTodos(getState())) {
      return dispatch(fetchTodos());
    }
  }
}

function shouldFetchTodos ({ todos }) {
  return todos.when_fetched === null;
}

export function addBucket (bucket) {
  return dispatch => {
    dispatch({ type: 'ADD_BUCKET_REQUEST' });

    const headers = headersJSON();
    const endpoint = `${baseURL}/buckets`;
    const method = 'POST';
    const body = JSON.stringify(bucket);

    return fetch(endpoint, { method, headers, body })
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
        dispatch({ data, type: 'ADD_BUCKET_SUCCESS' });
      })
      .catch(error => {
        dispatch({ error, type: 'ADD_BUCKET_FAILURE' });
      });
  }
}

export function deleteBucket (bucket) {
  const id = bucket.id;

  return dispatch => {
    dispatch({ type: 'DELETE_BUCKET_REQUEST' })

    const headers = headersJSON();
    const endpoint = `${baseURL}/buckets/${id}`;
    const method = 'DELETE';

    return fetch(endpoint, { method, headers })
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
        dispatch({ id, type: 'DELETE_BUCKET_SUCCESS' })
      })
      .catch(error => {
        dispatch({ error, type: 'DELETE_BUCKET_FAILURE' })
      });
  };
}

export function editBucket (bucket) {
  return dispatch => {
    dispatch({ type: 'EDIT_BUCKET_REQUEST' })

    const headers = headersJSON();
    const endpoint = `${baseURL}/buckets/${bucket.id}`;
    const method = 'PUT';
    const body = JSON.stringify(Object.assign({}, bucket));

    return fetch(endpoint, { method, headers, body })
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
        dispatch({ data, type: 'EDIT_BUCKET_SUCCESS' })
      })
      .catch(error => {
        dispatch({ error, type: 'EDIT_BUCKET_FAILURE' })
      });
  };
}

export function fetchBuckets () {
  return dispatch => {
    dispatch({ type: 'FETCH_BUCKETS_REQUEST' });

    const headers = headersJSON();
    const endpoint = `${baseURL}/buckets`;

    return fetch(endpoint, { headers })
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
        dispatch({ data, type: 'FETCH_BUCKETS_SUCCESS' });
      })
      .catch(error => {
        dispatch({ error, type: 'FETCH_BUCKETS_FAILURE' });
      })
  }
}
export function fetchBucketsIfNeeded () {
  return (dispatch, getState) => {
    if (shouldFetchBuckets(getState())) {
      return dispatch(fetchBuckets());
    }
  }
}

function shouldFetchBuckets ({ buckets }) {
  return buckets.when_fetched === null;
}

export function returnActiveBucket (){
  return dispatch => {dispatch({ type: 'ACTIVE_BUCKET' })}
}
export function changeBucket (text) {
  return dispatch => {dispatch({ text, type: 'CHANGE_BUCKET' })}
}

export function returnActiveTab (){
  return dispatch => {dispatch({ type: 'ACTIVE_TAB' })}
}
export function changeTab (text) {
  return dispatch => {dispatch({ text, type: 'CHANGE_TAB' })}
}
export function toggleTodo (todo) {
  return dispatch => {
    dispatch({ type: 'TOGGLE_TODO_REQUEST' })

    const headers = headersJSON();
    const endpoint = `${baseURL}/todos/${todo.id}`;
    const method = 'PUT';
    const body = JSON.stringify(Object.assign({}, todo, { completed: !todo.completed }));

    return fetch(endpoint, { method, headers, body })
      .then(checkStatus)
      .then(response => response.json())
      .then(data => {
        dispatch({ data, type: 'TOGGLE_TODO_SUCCESS' })
      })
      .catch(error => {
        dispatch({ error, type: 'TOGGLE_TODO_FAILURE' })
      });
  };
}
