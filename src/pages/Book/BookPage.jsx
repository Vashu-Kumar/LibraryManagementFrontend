import React from 'react'
import GenreFilter from './GenreFilter'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import BookCard from './BookCard'

const genres = [
    {
        "active": true,
        bookCount: 30,
        "code": "FICTION",
        "createdAt": "2026-04-01T12:00:00.321987",
        "description": "Fiction focused on imaginative storytelling.",
        "id": 1,
        "name": "Fiction",
        "parentGenreId": null,
        "parentGenreName": null,
        "subGenres": null,
        "updatedAt": "2026-04-01T12:00:00.321987"
    },
    {
        "active": true,
        bookCount: 30,
        "code": "FICTION",
        "createdAt": "2026-04-01T12:00:00.321987",
        "description": "Fiction focused on imaginative storytelling.",
        "id": 2,
        "name": "Fiction",
        "parentGenreId": null,
        "parentGenreName": null,
        "subGenres": null,
        "updatedAt": "2026-04-01T12:00:00.321987"
    },
    {
        "active": true,
        bookCount: 30,
        "code": "FICTION",
        "createdAt": "2026-04-01T12:00:00.321987",
        "description": "Fiction focused on imaginative storytelling.",
        "id": 3,
        "name": "Fiction",
        "parentGenreId": null,
        "parentGenreName": null,
        "subGenres": null,
        "updatedAt": "2026-04-01T12:00:00.321987"
    },
    {
        "active": true,
        bookCount: 30,
        "code": "FICTION",
        "createdAt": "2026-04-01T12:00:00.321987",
        "description": "Fiction focused on imaginative storytelling.",
        "id": 4,
        "name": "Fiction",
        "parentGenreId": null,
        "parentGenreName": null,
        "subGenres": null,
        "updatedAt": "2026-04-01T12:00:00.321987"
    },
    {
        "active": true,
        bookCount: 30,
        "code": "FICTION",
        "createdAt": "2026-04-01T12:00:00.321987",
        "description": "Fiction focused on imaginative storytelling.",
        "id": 5,
        "name": "Fiction",
        "parentGenreId": null,
        "parentGenreName": null,
        "subGenres": null,
        "updatedAt": "2026-04-01T12:00:00.321987"
    },
]

const books = [
    {
        "active": true,
        "alreadyHaveLoan": null,
        "alreadyHaveReservation": null,
        "author": "Dark Lord",
        "coveImageUrl": "http://res.cloudinary.com/dxoqwusir/image/upload/v1761368808/domain_driven_design.jpg",
        "createdAt": "2026-10-12T08:15:10.555666",
        "description": "A foundational book on applying domain-driven design principles to complex software projects.",
        "genreCode": "PROGRAMMING",
        "genreId": 10,
        "isbn": "978-0-13-235088-4",
        "language": "English",
        "pages": 464,
        "price": 499,
        "publicationDate": "2008-08-01",
        "publisher": "Dark Universe",
        "title": "DoomsDay",
        "totalCopies": 5,
        "updatedAt": "2026-10-13T10:20:22.654321"
    },
    {
        "active": true,
        "alreadyHaveLoan": null,
        "alreadyHaveReservation": null,
        "author": "Dark Lord",
        "availableCopies": 5,
        "coveImageUrl": "http://res.cloudinary.com/dxoqwusir/image/upload/v1761368808/domain_driven_design.jpg",
        "createdAt": "2026-10-12T08:15:10.555666",
        "description": "A foundational book on applying domain-driven design principles to complex software projects.",
        "genreCode": "PROGRAMMING",
        "genreId": 2,
        "isbn": "978-0-13-235088-4",
        "language": "English",
        "pages": 464,
        "price": 499,
        "publicationDate": "2008-08-01",
        "publisher": "Dark Universe",
        "title": "DoomsDay",
        "totalCopies": 5,
        "updatedAt": "2026-10-13T10:20:22.654321"
    },
    {
        "active": true,
        "alreadyHaveLoan": null,
        "alreadyHaveReservation": null,
        "author": "Dark Lord",
        "availableCopies": 5,
        "coveImageUrl": "http://res.cloudinary.com/dxoqwusir/image/upload/v1761368808/domain_driven_design.jpg",
        "createdAt": "2026-10-12T08:15:10.555666",
        "description": "A foundational book on applying domain-driven design principles to complex software projects.",
        "genreCode": "PROGRAMMING",
        "genreId": 13,
        "isbn": "978-0-13-235088-4",
        "language": "English",
        "pages": 464,
        "price": 499,
        "publicationDate": "2008-08-01",
        "publisher": "Dark Universe",
        "title": "DoomsDay",
        "totalCopies": 5,
        "updatedAt": "2026-10-13T10:20:22.654321"
    },
    {
        "active": true,
        "alreadyHaveLoan": null,
        "alreadyHaveReservation": null,
        "author": "Dark Lord",
        "availableCopies": 5,
        "coveImageUrl": "http://res.cloudinary.com/dxoqwusir/image/upload/v1761368808/domain_driven_design.jpg",
        "createdAt": "2026-10-12T08:15:10.555666",
        "description": "A foundational book on applying domain-driven design principles to complex software projects.",
        "genreCode": "PROGRAMMING",
        "genreId": 11,
        "isbn": "978-0-13-235088-4",
        "language": "English",
        "pages": 464,
        "price": 499,
        "publicationDate": "2008-08-01",
        "publisher": "Dark Universe",
        "title": "DoomsDay",
        "totalCopies": 5,
        "updatedAt": "2026-10-13T10:20:22.654321"
    },
    {
        "active": true,
        "alreadyHaveLoan": null,
        "alreadyHaveReservation": null,
        "author": "Dark Lord",
        "availableCopies": 5,
        "coveImageUrl": "http://res.cloudinary.com/dxoqwusir/image/upload/v1761368808/domain_driven_design.jpg",
        "createdAt": "2026-10-12T08:15:10.555666",
        "description": "A foundational book on applying domain-driven design principles to complex software projects.",
        "genreCode": "PROGRAMMING",
        "genreId": 14,
        "isbn": "978-0-13-235088-4",
        "language": "English",
        "pages": 464,
        "price": 499,
        "publicationDate": "2008-08-01",
        "publisher": "Dark Universe",
        "title": "DoomsDay",
        "totalCopies": 5,
        "updatedAt": "2026-10-13T10:20:22.654321"
    },
    {
        "active": true,
        "alreadyHaveLoan": null,
        "alreadyHaveReservation": null,
        "author": "Dark Lord",
        "availableCopies": 5,
        "coveImageUrl": "http://res.cloudinary.com/dxoqwusir/image/upload/v1761368808/domain_driven_design.jpg",
        "createdAt": "2026-10-12T08:15:10.555666",
        "description": "A foundational book on applying domain-driven design principles to complex software projects.",
        "genreCode": "PROGRAMMING",
        "genreId": 9,
        "isbn": "978-0-13-235088-4",
        "language": "English",
        "pages": 464,
        "price": 499,
        "publicationDate": "2008-08-01",
        "publisher": "Dark Universe",
        "title": "DoomsDay",
        "totalCopies": 5,
        "updatedAt": "2026-10-13T10:20:22.654321"
    },
]

const BookPage = () => {

    const [selectedGenreId, setSelectedGenreId] = React.useState(null);
    const handleGenreChange = (genreId) => {
        setSelectedGenreId(genreId);
    };
    console.log(selectedGenreId);

    const [availabilityFilter, setAvailabilityFilter] = React.useState('ALL');
    const [searchTerm, setSearchTerm] = React.useState("");
    const [sortBy, setSortBy] = React.useState("createdAt");
    const [direction, setDirection] = React.useState("DESC");

    const handleSortChange = (value) => {
        const [field, direction] = value.split("-");
        setSortBy(field);
        setDirection(direction.toUpperCase());
    };

    const getCurrentSortValue = () => {
        return `${sortBy}-${direction.toLowerCase()}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-300">

            {/* Header       */}
            <div className="bg-white border-b border-gray-100 text-center">
                <div className="px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                        <h1>Browse our{" "}
                            <span className="bg-gradient-to-br from-indigo-800 to-purple-600 text-transparent bg-clip-text">
                                Collection
                            </span>
                        </h1>
                        <p className="text-lg text-black-700 font-semibold">
                            Discover thousands of books across various genres and categories.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Sidebar filter */}
                    <aside className="lg:w-72 space-y-6">
                        {/* Filter container */}
                        <div className="space-y-6">

                            {/* Genre filter */}
                            <GenreFilter onGenreChange={handleGenreChange} genres={genres} />

                            {/* Availability filter */}

                            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 pb-3 mb-4 border-b border-gray-200">Availability
                                </h3>

                                <FormControl fullWidth>
                                    <Select
                                        value={availabilityFilter}
                                        onChange={(e) => setAvailabilityFilter(e.target.value)}
                                    >
                                        <MenuItem value={"ALL"}>All Books</MenuItem>
                                        <MenuItem value={"AVAILABLE"}>Available Only</MenuItem>
                                        <MenuItem value={"CHECKED_OUT"}>Checked Out</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                        </div>
                    </aside>

                    {/* Main content area */}
                    <main className="flex flex-col space-y-6 flex-1 min-w-0">
                        <div className='flex flex-col md:flex-row gap-4 w-full'>
                            {/* Search input */}
                            <div className="flex-1">
                                <TextField fullWidth
                                    placeholder='Search by title, author, or category...'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </div>

                            {/* Sort Dropdown */}
                            <div className='md:w-64 w-full'>
                                <FormControl fullWidth>
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={getCurrentSortValue()}
                                        onChange={(e) => handleSortChange(e.target.value)}
                                        label="Sort By"
                                        startAdornment={
                                            <InputAdornment position="start">  
                                                <SortIcon />
                                            </InputAdornment>
                                        }
                                    >
                                        <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                                        <MenuItem value="title-desc">Title (Z-A)</MenuItem>
                                        <MenuItem value="author-asc">Author (A-Z)</MenuItem>
                                        <MenuItem value="author-desc">Author (Z-A)</MenuItem>
                                        <MenuItem value="createdAt-asc">Newest First</MenuItem>
                                        <MenuItem value="createdAt-desc">Oldest First</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        {/* Book grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {books.map((book) => (<BookCard key={book.id} book={book} />))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default BookPage
