import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ProductSpecsProps {
    specs: {
        name: string
        value: string
    }[]
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
    return (
        <div className="mt-12 bg-secondary/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Specifications</h2>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-secondary">
                            <TableHead className="w-[200px] font-bold">Specification</TableHead>
                            <TableHead className="font-bold">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {specs.map((spec, index) => (
                            <TableRow key={index} className="border-b border-secondary">
                                <TableCell className="font-medium">{spec.name}</TableCell>
                                <TableCell>{spec.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
