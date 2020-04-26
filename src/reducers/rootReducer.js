import initialState from '../store/initialState';

const now = () => ((new Date()).getTime());

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO_FAILURE':
      console.error(action.error);
      return state;

    case 'ADD_TODO_REQUEST':
      return state;

    case 'ADD_TODO_SUCCESS':
      return Object.assign({},
        state,
        {
          todos: {
            list: [ ...state.todos.list, action.data ],
            when_fetched: now()
          }
        }
      );

    case 'DELETE_TODO_REQUEST':
      return state;

    case 'DELETE_TODO_SUCCESS':
      return Object.assign({},
        state,
        {
          todos: {
            list: state.todos.list.filter(({ id }) => id !== action.id)
          }
        }
      );

    case 'DELETE_TODO_FAILURE':
      console.error(action.error);
      return state;

    case 'EDIT_TODO_REQUEST':
      return state;

    case 'EDIT_TODO_SUCCESS':
      return Object.assign({},
        state,
        {
          todos: {
            list: state.todos.list.map((todo) => {
              if (todo.id === action.data.id) {
               todo.text = action.data.text;
                todo.bucketId = action.data.bucketId
              }

              return todo;
            })
          }
        }
      );

    case 'EDIT_TODO_FAILURE':
      console.error(action.error);
      return state;

    case 'FETCH_TODOS_FAILURE':
      console.error(action.error);
      return state;

    case 'FETCH_TODOS_REQUEST':
      return state;

    case 'FETCH_TODOS_SUCCESS':
      return Object.assign({},
        state,
        {
          todos: {
            list: action.data,
            when_fetched: now()
          }
        }
      );
      case 'ADD_BUCKET_FAILURE':
        console.error(action.error);
        return state;

      case 'ADD_BUCKET_REQUEST':
        return state;

      case 'ADD_BUCKET_SUCCESS':
        return Object.assign({},
          state,
          {
            buckets: {
              list: [ ...state.buckets.list, action.data ],
              when_fetched: now()
            }
          }
        );

      case 'DELETE_BUCKET_REQUEST':
        return state;

      case 'DELETE_BUCKET_SUCCESS':
        return Object.assign({},
          state,
          {
            buckets: {
              list: state.buckets.list.filter(({ id }) => id !== action.id)
            }
          }
        );

      case 'DELETE_BUCKET_FAILURE':
        console.error(action.error);
        return state;

      case 'EDIT_BUCKET_REQUEST':
        return state;

      case 'EDIT_BUCKET_SUCCESS':
        return Object.assign({},
          state,
          {
            buckets: {
              list: state.buckets.list.map((bucket) => {
                if (bucket.id === action.data.id) {
                 bucket.text = action.data.text;
                }

                return bucket;
              })
            }
          }
        );

      case 'EDIT_BUCKET_FAILURE':
        console.error(action.error);
        return state;

      case 'FETCH_BUCKETS_FAILURE':
        console.error(action.error);
        return state;

      case 'FETCH_BUCKETS_REQUEST':
        return state;

      case 'FETCH_BUCKETS_SUCCESS':
        return Object.assign({},
          state,
          {
            buckets: {
              list: action.data,
              when_fetched: now()
            }
          }
        );

    case 'TOGGLE_TODO_REQUEST':
      return state;

    case 'TOGGLE_TODO_SUCCESS':
      return Object.assign({},
        state,
        {
          todos: {
            list: state.todos.list.map((todo) => {
              if (todo.id === action.data.id) {
               todo.completed = action.data.completed;
              }

              return todo;
            })
          }
        }
      );

    case 'ACTIVE_BUCKET':
      return state;
    case 'ACTIVE_TAB':
      return state;
    case 'TOGGLE_TODO_FAILURE':
      console.error(action.error);
      return state;

    case 'CHANGE_BUCKET' :
    return Object.assign({},
      state,
      {
        activeBucket:action.text
      }
    );
    case 'CHANGE_TAB' :
    return Object.assign({},
      state,
      {
        activeTab:action.text
      }
    );
    default:
      return state;
  }
}
