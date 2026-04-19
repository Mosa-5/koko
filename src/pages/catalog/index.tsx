import {Link} from 'react-router-dom';
import {signLanguages} from './dummyData'
import {Button} from '@/components/ui/button';

const LanguageCatalog = () => {

    return (
        <div className="full max-w-6xl m-auto flex flex-col gap-10">
            <h1 className='text-center text-3xl font-semibold px-2'>Choose Your Language</h1>
            <div className='flex flex-wrap justify-center gap-10 '>
                {
                    signLanguages.map((item, index) => {
                        return (
                            <Link
                                onClick={(e) => index !== 0 && e.preventDefault()}
                                to={`/catalog/${item.name}`}
                                className='w-full max-w-72'
                            >
                                <Button variant="ghost" className='min-h-28 justify-center gap-5 w-full overflow-hidden relative flex items-center p-5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors'>
                                    <img src={item.image} alt="" className={`w-20 h-20 border border-black rounded-full ${index !== 0 ? "grayscale opacity-40" : ""}`}/>
                                    <span className={`font-semibold text-4xl ${index !== 0 ? "text-gray-400" : ""}`}>{item.name}</span>
                                </Button>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default LanguageCatalog;