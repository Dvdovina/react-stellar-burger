import feedListStyles from './feedList.module.css'
import FeedCard from '../feedCard/feedCard'
import { WS_FEED_URL } from '../../utils/api'
import { useSelector, useDispatch } from 'react-redux';
import { wsConnect, wsDisconnect } from '../../services/actions/wsActions'
import { useEffect } from 'react';


function FeedList() {

   const dispatch = useDispatch()
   const { orders, error } = useSelector(
      (store) => store.feed,
   );

   useEffect(() => {
      dispatch(wsConnect(WS_FEED_URL));
      return () => dispatch(wsDisconnect());
   }, []);


   return (
      <section className={feedListStyles.section}>
         <h2 className="pb-5 pl-3 text text_type_main-large">Лента Заказов</h2>
         <ul className={`custom-scroll ${feedListStyles.order_list}`}>
            {orders.map((order, key) => (
               <FeedCard key={key} order={order} />
            ))}
         </ul>
      </section>
   )
}


export default FeedList