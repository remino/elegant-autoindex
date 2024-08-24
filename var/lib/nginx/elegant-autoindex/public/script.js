;(function () {
	const getFilesTable = () => document.getElementById('files')
	const getTableSections = table => table.querySelectorAll('tfoot, thead')

	const compare = (x, y, asc, isNumber) => {
		if (isNumber) {
			return asc ? x - y : y - x
		} else {
			const xStr = x.toLowerCase()
			const yStr = y.toLowerCase()
			return asc ? (xStr < yStr ? -1 : 1) : xStr > yStr ? -1 : 1
		}
	}

	const formatSize = size => {
		if (!size) return ''
		const units = ['B', 'KB', 'MB', 'GB', 'TB']
		let index = 0
		while (size >= 1024 && index < units.length - 1) {
			size /= 1024
			index++
		}
		return `${size.toFixed(1)} ${units[index]}`
	}

	const formatDate = date => {
		if (!date) return ''
		const options = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false, // 24-hour format
		}
		return new Date(date)
			.toLocaleString('sv-SE', options)
			.replace(' ', 'T')
			.replace('T', ' ')
	}

	const sortTable = (colIndex, isNumber, initialAsc) => {
		const table = document.getElementById('files')
		const tbody = table.querySelector('tbody')
		const rows = Array.from(tbody.rows)
		const currentDir = table.dataset.sortDir
		const newDir = currentDir === 'asc' ? 'desc' : 'asc'

		const asc =
			currentDir && table.dataset.sortCol == colIndex
				? newDir === 'asc'
				: initialAsc

		rows.sort((a, b) =>
			compare(
				isNumber
					? parseInt(a.cells[colIndex].dataset.value)
					: a.cells[colIndex].textContent,
				isNumber
					? parseInt(b.cells[colIndex].dataset.value)
					: b.cells[colIndex].textContent,
				asc,
				isNumber
			)
		)

		rows.forEach(row => tbody.appendChild(row))
		table.dataset.sortDir = asc ? 'asc' : 'desc'
		table.dataset.sortCol = colIndex

		document
			.querySelectorAll('th.sortable')
			.forEach(th => th.classList.remove('asc', 'desc'))

		getTableSections(getFilesTable()).forEach(section => {
			section.querySelectorAll('th')
				[colIndex].classList.add(asc ? 'asc' : 'desc')
		})
	}

	const initializeTable = () => {
		const table = document.getElementById('files')

		table.querySelectorAll('td:nth-child(3)').forEach(td => {
			td.textContent = formatDate(td.textContent)
		})

		table.querySelectorAll('td:nth-child(4)').forEach(td => {
			td.dataset.value = td.textContent
			td.textContent = formatSize(td.textContent)
		})

		// Initial sorting by name in ascending order
		sortTable(0, false, true)
	}

	document.addEventListener('DOMContentLoaded', () => {
		initializeTable()

		getTableSections(getFilesTable()).forEach((section, index) => {
			section.querySelectorAll('th.sortable').forEach((th, index) => {
				const type = th.dataset.type
				const isNumber = type === 'size'
				const initialAsc = type === 'name'

				th.addEventListener('click', () => {
					sortTable(index, isNumber, initialAsc)
				})
			})
		})
	})
})()
