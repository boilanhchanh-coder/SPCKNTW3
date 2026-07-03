document.querySelectorAll('.select-button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.select-button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});