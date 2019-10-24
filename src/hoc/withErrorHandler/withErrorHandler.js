import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }

        

        componentWillMount(){
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use( (response) => {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // Do something with response data
                return response;
              },  (error) => {
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                this.setState({error: error});
                return Promise.reject(error);
              });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        backHandler = () => {
            this.setState({error: null});
        }

        render () {
            return(
                <>
                    <Modal show={this.state.error} backHandler={this.backHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/> 
                </>
            );
        }
    }
}

export default withErrorHandler;
