import feedStatsStyles from './feedStats.module.css'
import { FC } from 'react'
import { TOrder } from '../../utils/common-types'

interface IFeedStats {
   orders: TOrder[]
   total: number | null
   totalToday: number | null
}

const FeedStats: FC<IFeedStats> = ({ orders, total, totalToday }) => {


   const completedOrders = orders.filter(({ status }) => {
      return status === 'done'
   })

   const ongoingOrders = orders.filter(({ status }) => {
      return status !== 'done'
   })

   return (
      <section className={feedStatsStyles.section}>
         <div className={feedStatsStyles.status}>
            <div className={feedStatsStyles.status_box}>
               <p className="text text_type_main-medium pb-6">Готовы:</p>
               <ul className={feedStatsStyles.orders_list} >
                  {completedOrders.map(
                     ({ number }, key) =>
                        key < 4 && (
                           <li key={key} className={`${feedStatsStyles.number, feedStatsStyles.done} text text_type_digits-default`}>{number}</li>
                        )
                  )}
               </ul>
            </div>
            <div className={feedStatsStyles.status_box}>
               <p className="text text_type_main-medium pb-6">В работе:</p>
               <ul className={feedStatsStyles.orders_list}>
                  {ongoingOrders.map(
                     ({ number }, key) =>
                        key < 3 && (
                           <li key={key} className={`${feedStatsStyles.number} text text_type_digits-default`}>{number}</li>
                        )
                  )}

               </ul>
            </div>
         </div>
         <div className={feedStatsStyles.statistics}>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <span className={`${feedStatsStyles.shadow} text text_type_digits-large`}>{total}</span>
         </div>
         <div className={feedStatsStyles.statistics}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <span className={`${feedStatsStyles.shadow} text text_type_digits-large`}>{totalToday}</span>
         </div>
      </section>
   )
}


export default FeedStats



