export default function Banner({children}:{children: React.ReactNode;}){
    return (
        <div>
            <div className="border-b border-t p-4 text-center">
                20% off for the next 3 days..
            </div>
            {children}
        </div>
    )
}