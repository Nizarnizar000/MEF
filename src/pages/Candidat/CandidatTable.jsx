import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { z } from "zod"

const CandidatTable = ({ data }) => {

    const tableSchema = z.object({
        nom: z.string(),
        prenom: z.string(),
        email: z.string().email(),
        cin: z.string().max(6),
        status: z.boolean()
    })

    const [columns,setColumns] = useState([
        {
            accessorKey: "nom",
            header: "Nom"
        },
        {
            accessorKey: "prenom",
            header: "Prénom"
        },
        {
            accessorKey: "email",
            header: "Email"
        },
        {
            accessorKey: "cin",
            header: "Cin"
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ getValue }) => {
                const value = getValue();
                return value ? "✅" : "❌";
            }
        }
    ])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })


    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    console.log(header)
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null :
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {
                        table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id} data-state={row.getIsSelected && "selected"}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>

                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Aucun Résultat
                                </TableCell>
                            </TableRow>
                        )

                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CandidatTable