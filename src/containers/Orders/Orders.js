import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
class Orders extends Component
{
    state={
        orders:[],
        loading:true
    }
    componentDidMount()
    {
        // console.log(this.props.Token)
        const queryParams = '?auth=' + this.props.Token + '&orderBy="userId"&equalTo="' + localStorage.getItem('userId') + '"';
        axios.get('/orders.json'+queryParams)
        .then((response)=>{
            // console.log(response.data);
            let arr=[];
            for(let key in response.data)
            {
                arr.push({
                    ...response.data[key],
                    id:key,
                })
            }
            this.setState({
                orders:arr,
                loading:false,
            })
        })
    
    }
    render()
    {
        return(
            <div>
                {this.state.orders.map(order=>{
                    return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    TotalPrice={order.price}
                    />
                })}
            </div>
        );
    }
}
export default Orders;
