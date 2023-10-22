import feedListStyles from './feedList.module.css'
import FeedCard from '../feedCard/feedCard'



interface Props {
   orders: any[];
}

const FeedList: React.FC<Props> = ({ orders }) => {

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