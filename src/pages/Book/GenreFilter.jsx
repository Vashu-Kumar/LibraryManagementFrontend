import React from 'react'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';

const GenreFilter = ({ genres, selectedGenreId, onGenreChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">

            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Genres</h3>

                {selectedGenreId && (
                    <button
                        onClick={() => onGenreChange(null)}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                    >
                        Clear Filter
                    </button>
                )}
            </div>

            {/* All genres option */}
            <div
                className={`flex items-center space-x-2 py-2 px-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${!selectedGenreId
                    ? 'bg-indigo-100 text-indigo-800 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                    }`}
                onClick={() => onGenreChange(null)}
            >
                {!selectedGenreId ? (
                    <RadioButtonChecked sx={{ fontSize: 16, color: '#4f46e5' }} />
                ) : (
                    <RadioButtonUnchecked sx={{ fontSize: 16 }} />
                )}
                <span className="ml-2 text-sm font-medium">All Genres</span>
            </div>

            {/* Genre List */}
            <div className="space-y-2 pl-10 max-h-96 overflow-y-auto custom-scrollbar">
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group" 
                        onChange={(e) => onGenreChange(parseInt(e.target.value))}
                    >
                        { genres.map((genre) => (
                            <FormControlLabel
                            key={genre.id}
                            value={genre.id}
                            control={<Radio />}
                            label={genre.name}
                            />
                        )) }
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
}

export default GenreFilter;