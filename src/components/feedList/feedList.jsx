import feedListStyles from './feedList.module.css'
import FeedCard from '../feedCard/feedCard'




function FeedList() {


   return (
      <section className={feedListStyles.section}>
         <h2 className="pb-5 pl-3 text text_type_main-large">Лента Заказов</h2>
         <ul className={`custom-scroll ${feedListStyles.order_list}`}>
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
         </ul>
      </section>
   )
}


export default FeedList