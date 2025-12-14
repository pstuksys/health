'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RichText, isLexicalEditorState } from '@/app/(frontend)/components/ui/rich-text'
import type { Page } from '@/payload-types'

export function TableBlock({
  title,
  columns = [],
  data = [],
}: Extract<NonNullable<Page['blocks']>[number], { blockType: 'table' }>) {
  return (
    <section className="py-8 px-4">
      <div className="w-full max-w-container mx-auto">
        {title && (
          <h2 className="text-3xl font-light text-ds-dark-blue mb-8 text-center">{title}</h2>
        )}

        <div className="rounded-xl border border-border bg-card shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-ds-dark-blue hover:bg-opacity-95 border-b-0">
                {columns.map((column, index) => (
                  <TableHead
                    key={`column-${index}`}
                    className={`font-semibold text-base h-14 text-white text-center ${index !== columns.length - 1 ? 'border-r border-white/20' : ''}`}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow
                  key={`row-${rowIndex}`}
                  className={`transition-colors ${rowIndex !== data.length - 1 ? 'border-b border-border' : 'border-b-0'}`}
                >
                  {columns.map((column, colIndex) => {
                    const cellContent = row.cells?.[colIndex]?.content
                    return (
                      <TableCell
                        key={`cell-${rowIndex}-${colIndex}`}
                        className={`py-5 text-base text-ds-pastille-green ${colIndex !== columns.length - 1 ? 'border-r border-border' : ''}`}
                      >
                        {cellContent && isLexicalEditorState(cellContent) ? (
                          <RichText data={cellContent as unknown} className="max-w-none" />
                        ) : (
                          <span className="text-gray-400 italic"> </span>
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
