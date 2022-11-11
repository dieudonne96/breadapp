import type { FieldValues, UseFormRegister } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';

const Search : React.FC<Props> = ({ register}) => {

    return(
        <div className='relative'>
            <input type="text" {...register('search',{ required : true })}
                placeholder="Type your product id here" 
                className="pl-8 input im input-bordered w-96 placeholder:text-xs  placeholder:text-slate-600 focus:outline-primary" />
            <CiSearch className='absolute top-4 left-3' />
        </div>
    )
}
export default Search;

type Props = {
    register :  UseFormRegister<FieldValues>
}