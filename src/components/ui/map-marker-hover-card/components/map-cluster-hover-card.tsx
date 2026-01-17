import React from 'react'
import { Typography } from '@/components/atoms/typography'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { MapMarkerHoverCardNS } from '../map-marker-hover-card.types'

export function ClusterHoverCard({
  list,
}: MapMarkerHoverCardNS.ClusterHoverCardProps) {
  const totalCount =
    list?.reduce(
      (sum: number, item: MapMarkerHoverCardNS.ClusterDataItem) =>
        sum + item.count,
      0
    ) || 1

  return (
    <div className="flex gap-2 p-4 border rounded-lg border-neutral-1 bg-light-1">
      <div className="w-[180px] h-[164px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={list}
              labelLine={false}
              outerRadius="100%"
              dataKey="count"
            >
              {list?.map(
                (
                  entry: MapMarkerHoverCardNS.ClusterDataItem,
                  index: number
                ) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                )
              )}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-4">
        {list?.map(
          (item: MapMarkerHoverCardNS.ClusterDataItem, index: number) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <img src={item.icon_url} alt={item.name || 'Brand icon'} />
                <Typography variant="body4" className="text-light-3">
                  {item.name}
                </Typography>
              </div>
              <Typography variant="body4" className="text-light-2">
                {((item.count / totalCount) * 100).toFixed(2)}% ({item.count})
              </Typography>
            </div>
          )
        )}
      </div>
    </div>
  )
}
